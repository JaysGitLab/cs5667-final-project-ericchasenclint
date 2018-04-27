import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, FormBuilder, Validators, ValidatorFn, AbstractControl } from '@angular/forms';

import { ContestService } from './createcontest.service';

import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/map';

@Component({
    selector: 'createcontest',
    templateUrl: './createcontest.component.html',
    styleUrls: ['createcontest.component.scss'],
    providers: [ContestService]
})
export class CreateContestComponent implements OnInit{
    regions: string[] = ["North", "South", "East", "West"];
    seeds: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
    showInvalidWarning = false;
    minStartDate: Date = new Date();
    maxStartDate: Date = new Date(new Date().setFullYear(new Date().getFullYear() + 1));

    minEndDate: Date = new Date();
    maxEndDate: Date = new Date(new Date().setFullYear(new Date().getFullYear() + 1));

    errorMessage: string;

    contestform: FormGroup;
    filteredTeams: Observable<any[]>;

    constructor (private fb: FormBuilder, private _router: Router,
        private _contestService: ContestService) {
    }

    ngOnInit() {
        let seedFormArrays = [];
        
        this.contestform = this.fb.group({
            year: this.fb.control((new Date()).getFullYear(), Validators.required),
            gender: this.fb.control(null, Validators.required),
            startDate: this.fb.control(null, Validators.required),
            endDate: this.fb.control(null, Validators.required),
        });
        for (let seed of this.seeds){
            for (let region of this.regions ){
                let formControl: FormControl =  new FormControl(Teams.randomTeam().name, [Validators.required,
                                   TeamValidator.knownTeamValidator()])
                this.contestform.addControl(seed + region, formControl);
            }
        }
    }

    genderClass(){
        if (!this.contestform.get('gender').valid && this.contestform.get('gender').dirty){
            return 'mat-input-invalid';
        } else {
            return '';
        }
    }

    prepareSaveContest(): any{
//        return JSON.stringify(this.contestform.getRawValue());
        let out = {};
        out["year"] = this.contestform.get('year').value;
        out["gender"] = this.contestform.get('gender').value;
        out["seeds"] = [];
        
        // Grab start and end dates
        out["startDate"] = this.contestform.get("startDate").value;
        out["endDate"] = this.contestform.get("endDate").value;

        for (let seed of this.seeds){
            let seedObj = {};
            out["seeds"][seed] = seedObj;
            for (let region of this.regions ){
                let obj = {};
                obj["name"] = this.contestform.get(seed+region).value;
                obj["wins"] = 0;
                obj["stillIn"] = true;
                seedObj[region] = obj;
            }
        }
        return out;
    }
    onSubmit() {
        if (this.contestform.valid) {
            this.showInvalidWarning = false;
            let contest = this.prepareSaveContest();
            this._contestService
                .create(contest)
                .subscribe(createdContest => this._router.navigate(['/']),
                        error => this.errorMessage = error);
        } else {
            this.showInvalidWarning = true;
            for (let parent in this.contestform.controls){
                let controlGrp = this.contestform.get(parent);
                if (controlGrp instanceof FormGroup){
                    for (let key in controlGrp.controls){
                        controlGrp.get(key).markAsDirty();
                    }
                }else {
                    console.log(controlGrp);
                    controlGrp.markAsDirty();
                }
            }
        }
    }

    yeargenderchange() {
        let year = this.contestform.get('year').value;
        let gender = this.contestform.get('gender').value;
        let overwritewarning = "A " + year + " " + gender + "'s contest "
            + "already exists.\n\nIf you submit a new one, it will "
            + "overwrite the old one.\n\nProceed with caution.";
        if (year && gender) {
            this._contestService
                .byYearAndGender(year, gender)
                .subscribe(oldContest => {
                    if(oldContest){
                        alert(overwritewarning);
                    }
                },
                error =>{})
        }
    }
    
    onDatePickerChange(event) {
      this.minEndDate = new Date(event);
      let date = new Date(event);
      this.maxEndDate = new Date(date.setFullYear(date.getFullYear() + 1));
    }

//    fieldCss(seed, region): string {
//        let formCtrl: AbstractControl=this.contestform.get(seed+region);
//        console.log("gettingCss");
//        console.log(formCtrl);
//        if (!formCtrl.valid && formCtrl.dirty){
//           return "mat-form-field-invalid";
//        } else {
//            return "";
//        }
//    }
    fieldFocused(seed, region){
        console.log("focused " + seed + " " + region);
        let formControl: AbstractControl = this.contestform.get(seed+region);
        this.filteredTeams = formControl.valueChanges
            .startWith(formControl.value)
            .map(searchString => searchString ? this.filterTeams(searchString) : Teams.teams.slice());
    }

    teamMatches(searchTerms: string[], team: any){
      for(var strIdx=0; strIdx<searchTerms.length; strIdx++){
          let searchTerm = searchTerms[strIdx];
          if (!team.detail.toLocaleLowerCase().includes(searchTerm)){
              return false;
          }
      }
      return true;
    }
    filterTeams(searchString: string){
      if (searchString.length == 0) {
          return [];
      }
      searchString = searchString.toLocaleLowerCase();
      let searchTerms: string[] = searchString.split(" ");
      let matches: any[] = [];
      for(var teamIdx: number = 0; teamIdx < Teams.teams.length; teamIdx++){
         if (this.teamMatches(searchTerms, Teams.teams[teamIdx])){
            matches.push(Teams.teams[teamIdx]);
         }
      }
      return matches;
    }
}

class TeamValidator{
  static knownTeamValidator(): ValidatorFn {
      return (control: AbstractControl): {[key: string]: any} => {
          const knownTeam = false;
          for (let team of Teams.teams){
              if (team.name == control.value){
                  return null;
              }
          }
          return {'unknownTeam': {value: control.value}};
      }
  }
}

class Teams {
  static randomTeam(): any{
      return Teams.teams[Math.floor(Math.random() * Teams.teams.length)]
  }

  static teams: any[] = [
    {"detail": "Abilene Christian Wildcats", "short": "ABIL", "name": "Abilene Christian"},
    {"detail": "Air Force Falcons", "short": "AF", "name": "Air Force"},
    {"detail": "Akron Zips", "short": "AKRON", "name": "Akron"},
    {"detail": "Alabama A&M Bulldogs", "short": "ALAM", "name": "Alabama A&M"},
    {"detail": "Alabama Crimson Tide", "short": "BAMA", "name": "Alabama"},
    {"detail": "Alabama State Hornets", "short": "ALST", "name": "Alabama State"},
    {"detail": "Albany Great Danes", "short": "ALBANY", "name": "Albany"},
    {"detail": "Alcorn State Braves", "short": "ALCORN", "name": "Alcorn State"},
    {"detail": "American Eagles", "short": "AMER", "name": "American"},
    {"detail": "Appalachian State Mountaineers", "short": "APPST", "name": "Appalachian State"},
    {"detail": "Arizona State Sun Devils", "short": "ARIZST", "name": "Arizona State"},
    {"detail": "Arizona Wildcats", "short": "ARIZ", "name": "Arizona"},
    {"detail": "Arkansas Pine Bluff Golden Lions", "short": "ARKPB", "name": "Arkansas Pine Bluff"},
    {"detail": "Arkansas Razorbacks", "short": "ARK", "name": "Arkansas"},
    {"detail": "Arkansas State Red Wolves", "short": "ARKST", "name": "Arkansas State"},
    {"detail": "Army West Point Black Knights", "short": "ARMY", "name": "Army West Point"},
    {"detail": "Auburn Tigers", "short": "AUBURN", "name": "Auburn"},
    {"detail": "Austin Peay Governors", "short": "PEAY", "name": "Austin Peay"},
    {"detail": "Ball State Cardinals", "short": "BALLST", "name": "Ball State"},
    {"detail": "Baylor Bears", "short": "BAYLOR", "name": "Baylor"},
    {"detail": "Belmont Bruins", "short": "BELMONT", "name": "Belmont"},
    {"detail": "Bethune Cookman Wildcats", "short": "BCU", "name": "Bethune Cookman"},
    {"detail": "Binghamton Bearcats", "short": "BING", "name": "Binghamton"},
    {"detail": "Boise State Broncos", "short": "BOISE", "name": "Boise State"},
    {"detail": "Boston College Eagles", "short": "BC", "name": "Boston College"},
    {"detail": "Boston University Terriers", "short": "BU", "name": "Boston University"},
    {"detail": "Bowling Green Falcons", "short": "BGREEN", "name": "Bowling Green"},
    {"detail": "Bradley Braves", "short": "BRAD", "name": "Bradley"},
    {"detail": "Brigham Young Cougars", "short": "BYU", "name": "Brigham Young"},
    {"detail": "Brown Bears", "short": "BROWN", "name": "Brown"},
    {"detail": "Bryant University Bulldogs", "short": "BRYANT", "name": "Bryant University"},
    {"detail": "Bucknell Bison", "short": "BUCK", "name": "Bucknell"},
    {"detail": "Buffalo Bulls", "short": "BUFF", "name": "Buffalo"},
    {"detail": "Butler Bulldogs", "short": "BUTLER", "name": "Butler"},
    {"detail": "Cal Poly Mustangs", "short": "CPOLY", "name": "Cal Poly"},
    {"detail": "Cal State Bakersfield Roadrunners", "short": "CSBAK", "name": "Cal State Bakersfield"},
    {"detail": "Cal State Fullerton Titans", "short": "CSFULL", "name": "Cal State Fullerton"},
    {"detail": "California Golden Bears", "short": "CAL", "name": "California"},
    {"detail": "California Riverside Highlanders", "short": "UCRIV", "name": "California Riverside"},
    {"detail": "Campbell Fighting Camels", "short": "CAMP", "name": "Campbell"},
    {"detail": "Canisius Golden Griffins", "short": "CAN", "name": "Canisius"},
    {"detail": "Central Arkansas Bears", "short": "CARK", "name": "Central Arkansas"},
    {"detail": "Central Connecticut State Blue Devils", "short": "CCTST", "name": "Central Connecticut State"},
    {"detail": "Central Michigan Chippewas", "short": "CMICH", "name": "Central Michigan"},
    {"detail": "Charleston Southern Buccaneers", "short": "CHARSO", "name": "Charleston Southern"},
    {"detail": "Charlotte 49ers", "short": "CHARLO", "name": "Charlotte"},
    {"detail": "Chattanooga Mocs", "short": "CHATT", "name": "Chattanooga"},
    {"detail": "Chicago State Cougars", "short": "CHIST", "name": "Chicago State"},
    {"detail": "Cincinnati Bearcats", "short": "CINCY", "name": "Cincinnati"},
    {"detail": "Clemson Tigers", "short": "CLEM", "name": "Clemson"},
    {"detail": "Cleveland State Vikings", "short": "CLEVST", "name": "Cleveland State"},
    {"detail": "Coastal Carolina Chanticleers", "short": "CSTCAR", "name": "Coastal Carolina"},
    {"detail": "Colgate Raiders", "short": "COLG", "name": "Colgate"},
    {"detail": "College Of Charleston Cougars", "short": "CHARLS", "name": "College of Charleston"},
    {"detail": "Colorado Buffaloes", "short": "COLO", "name": "Colorado"},
    {"detail": "Colorado State Rams", "short": "COLOST", "name": "Colorado State"},
    {"detail": "Columbia Lions", "short": "CLMB", "name": "Columbia"},
    {"detail": "Connecticut Huskies", "short": "UCONN", "name": "Connecticut"},
    {"detail": "Coppin State Eagles", "short": "COPPST", "name": "Coppin State"},
    {"detail": "Cornell Big Red", "short": "CORN", "name": "Cornell"},
    {"detail": "Creighton Bluejays", "short": "CREIGH", "name": "Creighton"},
    {"detail": "Dartmouth Big Green", "short": "DART", "name": "Dartmouth"},
    {"detail": "Davidson Wildcats", "short": "DAVID", "name": "Davidson"},
    {"detail": "Dayton Flyers", "short": "DAYTON", "name": "Dayton"},
    {"detail": "Delaware Fightin Blue Hens", "short": "DEL", "name": "Delaware"},
    {"detail": "Delaware State Hornets", "short": "DELST", "name": "Delaware State"},
    {"detail": "Denver Pioneers", "short": "DENVER", "name": "Denver"},
    {"detail": "Depaul Blue Demons", "short": "DEPAUL", "name": "DePaul"},
    {"detail": "Detroit Titans", "short": "DTROIT", "name": "Detroit"},
    {"detail": "Drake Bulldogs", "short": "DRAKE", "name": "Drake"},
    {"detail": "Drexel Dragons", "short": "DREXEL", "name": "Drexel"},
    {"detail": "Duke Blue Devils", "short": "DUKE", "name": "Duke"},
    {"detail": "Duquesne Dukes", "short": "DUQ", "name": "Duquesne"},
    {"detail": "E Tennessee State Buccaneers", "short": "ETNST", "name": "E. Tennessee State"},
    {"detail": "East Carolina Pirates", "short": "ECU", "name": "East Carolina"},
    {"detail": "Eastern Illinois Panthers", "short": "EILL", "name": "Eastern Illinois"},
    {"detail": "Eastern Kentucky Colonels", "short": "EKY", "name": "Eastern Kentucky"},
    {"detail": "Eastern Michigan Eagles", "short": "EMICH", "name": "Eastern Michigan"},
    {"detail": "Eastern Washington Eagles", "short": "EWASH", "name": "Eastern Washington"},
    {"detail": "Elon Phoenix", "short": "ELON", "name": "Elon"},
    {"detail": "Evansville Aces", "short": "EVAN", "name": "Evansville"},
    {"detail": "Fairfield Stags", "short": "FAIR", "name": "Fairfield"},
    {"detail": "Fairleigh Dickinson Knights", "short": "FDU", "name": "Fairleigh Dickinson"},
    {"detail": "Florida A&M Rattlers", "short": "FAMU", "name": "Florida A&M"},
    {"detail": "Florida Atlantic Owls", "short": "FAU", "name": "Florida Atlantic"},
    {"detail": "Florida Gators", "short": "FLA", "name": "Florida"},
    {"detail": "Florida Gulf Coast Eagles", "short": "FGC", "name": "Florida Gulf Coast"},
    {"detail": "Florida International Golden Panthers", "short": "FIU", "name": "Florida International"},
    {"detail": "Florida State Seminoles", "short": "FSU", "name": "Florida State"},
    {"detail": "Fordham Rams", "short": "FORD", "name": "Fordham"},
    {"detail": "Fresno State Bulldogs", "short": "FRESNO", "name": "Fresno State"},
    {"detail": "Furman Paladins", "short": "FURMAN", "name": "Furman"},
    {"detail": "Gardner Webb Bulldogs", "short": "GWEBB", "name": "Gardner Webb"},
    {"detail": "George Mason Patriots", "short": "GMASON", "name": "George Mason"},
    {"detail": "George Washington Colonials", "short": "GWASH", "name": "George Washington"},
    {"detail": "Georgetown Hoyas", "short": "GTOWN", "name": "Georgetown"},
    {"detail": "Georgia Bulldogs", "short": "UGA", "name": "Georgia"},
    {"detail": "Georgia Southern Eagles", "short": "GASOU", "name": "Georgia Southern"},
    {"detail": "Georgia State Panthers", "short": "GAST", "name": "Georgia State"},
    {"detail": "Georgia Tech Yellow Jackets", "short": "GATECH", "name": "Georgia Tech"},
    {"detail": "Gonzaga Bulldogs", "short": "GONZAG", "name": "Gonzaga"},
    {"detail": "Grambling Tigers", "short": "GRAM", "name": "Grambling"},
    {"detail": "Grand Canyon Antelopes", "short": "GC", "name": "Grand Canyon"},
    {"detail": "Green Bay Phoenix", "short": "WISGB", "name": "Green Bay"},
    {"detail": "Hampton Pirates", "short": "HAMP", "name": "Hampton"},
    {"detail": "Hartford Hawks", "short": "HARTFD", "name": "Hartford"},
    {"detail": "Harvard Crimson", "short": "HARV", "name": "Harvard"},
    {"detail": "Hawaii Warriors", "short": "HAWAII", "name": "Hawaii"},
    {"detail": "High Point Panthers", "short": "HIGHPT", "name": "High Point"},
    {"detail": "Hofstra Pride", "short": "HOFSTRA", "name": "Hofstra"},
    {"detail": "Holy Cross Crusaders", "short": "HOLY", "name": "Holy Cross"},
    {"detail": "Houston Baptist Huskies", "short": "HOUBP", "name": "Houston Baptist"},
    {"detail": "Houston Cougars", "short": "HOU", "name": "Houston"},
    {"detail": "Howard Bison", "short": "HOW", "name": "Howard"},
    {"detail": "Idaho State Bengals", "short": "IDST", "name": "Idaho State"},
    {"detail": "Idaho Vandals", "short": "IDAHO", "name": "Idaho"},
    {"detail": "Illinois Chicago Flames", "short": "ILLCHI", "name": "Illinois Chicago"},
    {"detail": "Illinois Fighting Illini", "short": "ILL", "name": "Illinois"},
    {"detail": "Illinois State Redbirds", "short": "ILLST", "name": "Illinois State"},
    {"detail": "Incarnate Word Cardinals", "short": "UIW", "name": "Incarnate Word"},
    {"detail": "Indiana Hoosiers", "short": "IND", "name": "Indiana"},
    {"detail": "Indiana State Sycamores", "short": "INDST", "name": "Indiana State"},
    {"detail": "Iona Gaels", "short": "IONA", "name": "Iona"},
    {"detail": "Iowa Hawkeyes", "short": "IOWA", "name": "Iowa"},
    {"detail": "Iowa State Cyclones", "short": "IOWAST", "name": "Iowa State"},
    {"detail": "Ipfw Mastodons", "short": "IPFW", "name": "IPFW"},
    {"detail": "Iupui Jaguars", "short": "IUPUI", "name": "IUPUI"},
    {"detail": "Jackson State Tigers", "short": "JACKST", "name": "Jackson State"},
    {"detail": "Jacksonville Dolphins", "short": "JVILLE", "name": "Jacksonville"},
    {"detail": "Jacksonville State Gamecocks", "short": "JAXST", "name": "Jacksonville State"},
    {"detail": "James Madison Dukes", "short": "JMAD", "name": "James Madison"},
    {"detail": "Kansas Jayhawks", "short": "KANSAS", "name": "Kansas"},
    {"detail": "Kansas State Wildcats", "short": "KSTATE", "name": "Kansas State"},
    {"detail": "Kennesaw State Owls", "short": "KENSAW", "name": "Kennesaw State"},
    {"detail": "Kent State Golden Flashes", "short": "KENTST", "name": "Kent State"},
    {"detail": "Kentucky Wildcats", "short": "UK", "name": "Kentucky"},
    {"detail": "La Salle Explorers", "short": "LSALLE", "name": "La Salle"},
    {"detail": "Lafayette Leopards", "short": "LAFAY", "name": "Lafayette"},
    {"detail": "Lamar Cardinals", "short": "LAMAR", "name": "Lamar"},
    {"detail": "Lehigh Mountain Hawks", "short": "LEHIGH", "name": "Lehigh"},
    {"detail": "Liberty Flames", "short": "LIB", "name": "Liberty"},
    {"detail": "Lipscomb Bisons", "short": "LPSCMB", "name": "Lipscomb"},
    {"detail": "Little Rock Trojans", "short": "ARKLR", "name": "Little Rock"},
    {"detail": "Liu Brooklyn Blackbirds", "short": "LIU", "name": "LIU Brooklyn"},
    {"detail": "Long Beach State 49ers", "short": "LNGBCH", "name": "Long Beach State"},
    {"detail": "Longwood Lancers", "short": "LONGWD", "name": "Longwood"},
    {"detail": "Louisiana Monroe Warhawks", "short": "LAMON", "name": "Louisiana Monroe"},
    {"detail": "Louisiana Ragin Cajuns", "short": "LALAF", "name": "Louisiana"},
    {"detail": "Louisiana Tech Bulldogs", "short": "LATECH", "name": "Louisiana Tech"},
    {"detail": "Louisville Cardinals", "short": "LVILLE", "name": "Louisville"},
    {"detail": "Loyola Chicago Ramblers", "short": "LOYCHI", "name": "Loyola Chicago"},
    {"detail": "Loyola Maryland Greyhounds", "short": "LOYMD", "name": "Loyola Maryland"},
    {"detail": "Loyola Marymount Lions", "short": "LOYMRY", "name": "Loyola Marymount"},
    {"detail": "Lsu Tigers", "short": "LSU", "name": "LSU"},
    {"detail": "Maine Black Bears", "short": "MAINE", "name": "Maine"},
    {"detail": "Manhattan Jaspers", "short": "MANH", "name": "Manhattan"},
    {"detail": "Marist Red Foxes", "short": "MARIST", "name": "Marist"},
    {"detail": "Marquette Golden Eagles", "short": "MARQET", "name": "Marquette"},
    {"detail": "Marshall Thundering Herd", "short": "MRSHL", "name": "Marshall"},
    {"detail": "Maryland Baltimore County Retrievers", "short": "UMBC", "name": "Maryland Baltimore County"},
    {"detail": "Maryland Eastern Shore Hawks", "short": "UMES", "name": "Maryland Eastern Shore"},
    {"detail": "Maryland Terrapins", "short": "MD", "name": "Maryland"},
    {"detail": "Massachusetts Minutemen", "short": "UMASS", "name": "Massachusetts"},
    {"detail": "Mcneese State Cowboys", "short": "MCNSE", "name": "McNeese State"},
    {"detail": "Memphis Tigers", "short": "MEMP", "name": "Memphis"},
    {"detail": "Mercer Bears", "short": "MERCER", "name": "Mercer"},
    {"detail": "Miami Fla Hurricanes", "short": "MIAMI", "name": "Miami (Fla.)"},
    {"detail": "Miami Ohio Redhawks", "short": "MIAOH", "name": "Miami (Ohio)"},
    {"detail": "Michigan State Spartans", "short": "MICHST", "name": "Michigan State"},
    {"detail": "Michigan Wolverines", "short": "MICH", "name": "Michigan"},
    {"detail": "Middle Tennessee Blue Raiders", "short": "MTSU", "name": "Middle Tennessee"},
    {"detail": "Minnesota Golden Gophers", "short": "MINN", "name": "Minnesota"},
    {"detail": "Mississippi State Bulldogs", "short": "MISSST", "name": "Mississippi State"},
    {"detail": "Mississippi Valley State Delta Devils", "short": "MVSU", "name": "Mississippi Valley State"},
    {"detail": "Missouri State Bears", "short": "MOST", "name": "Missouri State"},
    {"detail": "Missouri Tigers", "short": "MIZZOU", "name": "Missouri"},
    {"detail": "Monmouth Hawks", "short": "MNMTH", "name": "Monmouth"},
    {"detail": "Montana Grizzlies", "short": "MNTNA", "name": "Montana"},
    {"detail": "Montana State Bobcats", "short": "MONST", "name": "Montana State"},
    {"detail": "Morehead State Eagles", "short": "MOREHD", "name": "Morehead State"},
    {"detail": "Morgan State Bears", "short": "MORGAN", "name": "Morgan State"},
    {"detail": "Mount St Marys Mountaineers", "short": "MOUNT", "name": "Mount St. Mary's"},
    {"detail": "Murray State Racers", "short": "MURYST", "name": "Murray State"},
    {"detail": "Navy Midshipmen", "short": "NAVY", "name": "Navy"},
    {"detail": "NC Greensboro Spartans", "short": "NCGRN", "name": "NC Greensboro"},
    {"detail": "NC State Wolfpack", "short": "NCST", "name": "NC State"},
    {"detail": "Nebraska Cornhuskers", "short": "NEB", "name": "Nebraska"},
    {"detail": "Nebraska Omaha Mavericks", "short": "NEBOM", "name": "Nebraska Omaha"},
    {"detail": "Nevada Wolf Pack", "short": "NEVADA", "name": "Nevada"},
    {"detail": "New Hampshire Wildcats", "short": "NH", "name": "New Hampshire"},
    {"detail": "New Jersey Tech Highlanders", "short": "NJTECH", "name": "New Jersey Tech"},
    {"detail": "New Mexico Lobos", "short": "NMEX", "name": "New Mexico"},
    {"detail": "New Mexico State Aggies", "short": "NMEXST", "name": "New Mexico State"},
    {"detail": "New Orleans Privateers", "short": "NORL", "name": "New Orleans"},
    {"detail": "Niagara Purple Eagles", "short": "NIAGARA", "name": "Niagara"},
    {"detail": "Nicholls State Colonels", "short": "NICHST", "name": "Nicholls State"},
    {"detail": "Norfolk State Spartans", "short": "NORFLK", "name": "Norfolk State"},
    {"detail": "North Carolina A&T Aggies", "short": "NCAT", "name": "North Carolina A&T"},
    {"detail": "North Carolina Central Eagles", "short": "NCCU", "name": "North Carolina Central"},
    {"detail": "North Carolina Tar Heels", "short": "UNC", "name": "North Carolina"},
    {"detail": "North Dakota Fighting Hawks", "short": "NDAK", "name": "North Dakota"},
    {"detail": "North Dakota State Bison", "short": "NDAKST", "name": "North Dakota State"},
    {"detail": "North Florida Ospreys", "short": "UNF", "name": "North Florida"},
    {"detail": "North Texas Mean Green", "short": "NTEXAS", "name": "North Texas"},
    {"detail": "Northeastern Huskies", "short": "NEAST", "name": "Northeastern"},
    {"detail": "Northern Arizona Lumberjacks", "short": "NAU", "name": "Northern Arizona"},
    {"detail": "Northern Colorado Bears", "short": "NCOLO", "name": "Northern Colorado"},
    {"detail": "Northern Illinois Huskies", "short": "NILL", "name": "Northern Illinois"},
    {"detail": "Northern Iowa Panthers", "short": "NIOWA", "name": "Northern Iowa"},
    {"detail": "Northern Kentucky Norse", "short": "NKY", "name": "Northern Kentucky"},
    {"detail": "Northridge Matadors", "short": "CSN", "name": "Northridge"},
    {"detail": "Northwestern State Demons", "short": "NWST", "name": "Northwestern State"},
    {"detail": "Northwestern Wildcats", "short": "NWEST", "name": "Northwestern"},
    {"detail": "Notre Dame Fighting Irish", "short": "ND", "name": "Notre Dame"},
    {"detail": "Oakland Golden Grizzlies", "short": "OAK", "name": "Oakland"},
    {"detail": "Ohio Bobcats", "short": "OHIO", "name": "Ohio"},
    {"detail": "Ohio State Buckeyes", "short": "OHIOST", "name": "Ohio State"},
    {"detail": "Oklahoma Sooners", "short": "OKLA", "name": "Oklahoma"},
    {"detail": "Oklahoma State Cowboys", "short": "OKLAST", "name": "Oklahoma State"},
    {"detail": "Old Dominion Monarchs", "short": "ODU", "name": "Old Dominion"},
    {"detail": "Ole Miss Rebels", "short": "MISS", "name": "Ole Miss"},
    {"detail": "Oral Roberts Golden Eagles", "short": "ORAL", "name": "Oral Roberts"},
    {"detail": "Oregon Ducks", "short": "OREG", "name": "Oregon"},
    {"detail": "Oregon State Beavers", "short": "OREGST", "name": "Oregon State"},
    {"detail": "Pacific Tigers", "short": "UOP", "name": "Pacific"},
    {"detail": "Penn State Nittany Lions", "short": "PSU", "name": "Penn State"},
    {"detail": "Pennsylvania Quakers", "short": "PENN", "name": "Pennsylvania"},
    {"detail": "Pepperdine Waves", "short": "PEPPER", "name": "Pepperdine"},
    {"detail": "Pittsburgh Panthers", "short": "PITT", "name": "Pittsburgh"},
    {"detail": "Portland Pilots", "short": "PORT", "name": "Portland"},
    {"detail": "Portland State Vikings", "short": "PORTST", "name": "Portland State"},
    {"detail": "Prairie View A&M Panthers", "short": "PVAM", "name": "Prairie View A&M"},
    {"detail": "Presbyterian Blue Hose", "short": "PRESBY", "name": "Presbyterian"},
    {"detail": "Princeton Tigers", "short": "PRINCE", "name": "Princeton"},
    {"detail": "Providence Friars", "short": "PROV", "name": "Providence"},
    {"detail": "Purdue Boilermakers", "short": "PURDUE", "name": "Purdue"},
    {"detail": "Quinnipiac Bobcats", "short": "QUINN", "name": "Quinnipiac"},
    {"detail": "Radford Highlanders", "short": "RADFRD", "name": "Radford"},
    {"detail": "Rhode Island Rams", "short": "RI", "name": "Rhode Island"},
    {"detail": "Rice Owls", "short": "RICE", "name": "Rice"},
    {"detail": "Richmond Spiders", "short": "RICH", "name": "Richmond"},
    {"detail": "Rider Broncs", "short": "RIDER", "name": "Rider"},
    {"detail": "Robert Morris Colonials", "short": "ROBERT", "name": "Robert Morris"},
    {"detail": "Rutgers Scarlet Knights", "short": "RUT", "name": "Rutgers"},
    {"detail": "Sacramento State Hornets", "short": "SACST", "name": "Sacramento State"},
    {"detail": "Sacred Heart Pioneers", "short": "SACHRT", "name": "Sacred Heart"},
    {"detail": "Saint Josephs Hawks", "short": "STJOES", "name": "Saint Joseph's"},
    {"detail": "Saint Louis Billikens", "short": "STLOU", "name": "Saint Louis"},
    {"detail": "Saint Marys Gaels", "short": "MARYCA", "name": "Saint Mary's"},
    {"detail": "Sam Houston State Bearkats", "short": "SAMHOU", "name": "Sam Houston State"},
    {"detail": "Samford Bulldogs", "short": "SAMFORD", "name": "Samford"},
    {"detail": "San Diego State Aztecs", "short": "SDGST", "name": "San Diego State"},
    {"detail": "San Diego Toreros", "short": "USD", "name": "San Diego"},
    {"detail": "San Francisco Dons", "short": "SANFRAN", "name": "San Francisco"},
    {"detail": "San Jose State Spartans", "short": "SJST", "name": "San Jose State"},
    {"detail": "Santa Barbara Gauchos", "short": "UCSB", "name": "Santa Barbara"},
    {"detail": "Santa Clara Broncos", "short": "SNCLRA", "name": "Santa Clara"},
    {"detail": "Savannah State Tigers", "short": "SAV", "name": "Savannah State"},
    {"detail": "Seattle Redhawks", "short": "SEATTLE", "name": "Seattle"},
    {"detail": "Seton Hall Pirates", "short": "SETON", "name": "Seton Hall"},
    {"detail": "Siena Saints", "short": "SIENA", "name": "Siena"},
    {"detail": "Siu Edwardsville Cougars", "short": "SIUE", "name": "SIU Edwardsville"},
    {"detail": "Smu Mustangs", "short": "SMU", "name": "SMU"},
    {"detail": "South Alabama Jaguars", "short": "SALAB", "name": "South Alabama"},
    {"detail": "South Carolina Gamecocks", "short": "SC", "name": "South Carolina"},
    {"detail": "South Carolina State Bulldogs", "short": "SCST", "name": "South Carolina State"},
    {"detail": "South Carolina Upstate Spartans", "short": "USCUP", "name": "South Carolina Upstate"},
    {"detail": "South Dakota Coyotes", "short": "SDAK", "name": "South Dakota"},
    {"detail": "South Dakota State Jackrabbits", "short": "SDAKST", "name": "South Dakota State"},
    {"detail": "South Florida Bulls", "short": "SFLA", "name": "South Florida"},
    {"detail": "Southeast Missouri State Redhawks", "short": "SEMO", "name": "Southeast Missouri State"},
    {"detail": "Southeastern Louisiana Lions", "short": "SELOU", "name": "Southeastern Louisiana"},
    {"detail": "Southern California Trojans", "short": "USC", "name": "Southern California"},
    {"detail": "Southern Illinois Salukis", "short": "SILL", "name": "Southern Illinois"},
    {"detail": "Southern Jaguars", "short": "STHRN", "name": "Southern"},
    {"detail": "Southern Miss Golden Eagles", "short": "USM", "name": "Southern Miss"},
    {"detail": "Southern Utah Thunderbirds", "short": "SUTAH", "name": "Southern Utah"},
    {"detail": "St Bonaventure Bonnies", "short": "STBON", "name": "St. Bonaventure"},
    {"detail": "St Francis Ny Terriers", "short": "STFRAN", "name": "St. Francis (N.Y.)"},
    {"detail": "St Francis Pa Red Flash", "short": "SFTRPA", "name": "St. Francis (Pa.)"},
    {"detail": "St Johns Red Storm", "short": "STJOHN", "name": "St. John's"},
    {"detail": "St Peters Peacocks", "short": "STPETE", "name": "St. Peter's"},
    {"detail": "Stanford Cardinal", "short": "STNFRD", "name": "Stanford"},
    {"detail": "Stephen F Austin Lumberjacks", "short": "SFA", "name": "Stephen F. Austin"},
    {"detail": "Stetson Hatters", "short": "STETSON", "name": "Stetson"},
    {"detail": "Stony Brook Seawolves", "short": "STNYBRK", "name": "Stony Brook"},
    {"detail": "Syracuse Orange", "short": "CUSE", "name": "Syracuse"},
    {"detail": "Tcu Horned Frogs", "short": "TCU", "name": "TCU"},
    {"detail": "Temple Owls", "short": "TEMPLE", "name": "Temple"},
    {"detail": "Tennessee State Tigers", "short": "TNST", "name": "Tennessee State"},
    {"detail": "Tennessee Tech Golden Eagles", "short": "TNTECH", "name": "Tennessee Tech"},
    {"detail": "Tennessee Volunteers", "short": "TENN", "name": "Tennessee"},
    {"detail": "Texas A&M Aggies", "short": "TEXAM", "name": "Texas A&M"},
    {"detail": "Texas A&M Corpus Christi Islanders", "short": "TXAMCC", "name": "Texas A&M Corpus Christi"},
    {"detail": "Texas Arlington Mavericks", "short": "TXARL", "name": "Texas Arlington"},
    {"detail": "Texas El Paso Miners", "short": "UTEP", "name": "Texas El Paso"},
    {"detail": "Texas Longhorns", "short": "TEXAS", "name": "Texas"},
    {"detail": "Texas Rio Grande Valley Vaqueros", "short": "TEXPA", "name": "Texas Rio Grande Valley"},
    {"detail": "Texas San Antonio Roadrunners", "short": "TXSA", "name": "Texas San Antonio"},
    {"detail": "Texas Southern Tigers", "short": "TEXSO", "name": "Texas Southern"},
    {"detail": "Texas State San Marcos Bobcats", "short": "TEXST", "name": "Texas State San Marcos"},
    {"detail": "Texas Tech Red Raiders", "short": "TXTECH", "name": "Texas Tech"},
    {"detail": "The Citadel Bulldogs", "short": "CIT", "name": "The Citadel"},
    {"detail": "Toledo Rockets", "short": "TOLEDO", "name": "Toledo"},
    {"detail": "Towson Tigers", "short": "TOWSON", "name": "Towson"},
    {"detail": "Troy Trojans", "short": "TROY", "name": "Troy"},
    {"detail": "Tulane Green Wave", "short": "TULANE", "name": "Tulane"},
    {"detail": "Tulsa Golden Hurricane", "short": "TULSA", "name": "Tulsa"},
    {"detail": "Uab Blazers", "short": "UAB", "name": "UAB"},
    {"detail": "Uc Davis Aggies", "short": "UCDAV", "name": "UC Davis"},
    {"detail": "Uc Irvine Anteaters", "short": "UCIRV", "name": "UC Irvine"},
    {"detail": "Ucf Knights", "short": "UCF", "name": "UCF"},
    {"detail": "Ucla Bruins", "short": "UCLA", "name": "UCLA"},
    {"detail": "Umass Lowell River Hawks", "short": "MASLOW", "name": "UMass Lowell"},
    {"detail": "Umkc Kangaroos", "short": "UMKC", "name": "UMKC"},
    {"detail": "Unc Asheville Bulldogs", "short": "NCASHV", "name": "UNC Asheville"},
    {"detail": "Unc Wilmington Seahawks", "short": "NCWILM", "name": "UNC Wilmington"},
    {"detail": "Unlv Rebels", "short": "UNLV", "name": "UNLV"},
    {"detail": "Ut Martin Skyhawks", "short": "TNMART", "name": "UT Martin"},
    {"detail": "Utah State Aggies", "short": "UTAHST", "name": "Utah State"},
    {"detail": "Utah Utes", "short": "UTAH", "name": "Utah"},
    {"detail": "Utah Valley Wolverines", "short": "UTVALL", "name": "Utah Valley"},
    {"detail": "Valparaiso Crusaders", "short": "VALPO", "name": "Valparaiso"},
    {"detail": "Vanderbilt Commodores", "short": "VANDY", "name": "Vanderbilt"},
    {"detail": "Vcu Rams", "short": "VCU", "name": "VCU"},
    {"detail": "Vermont Catamounts", "short": "UVM", "name": "Vermont"},
    {"detail": "Villanova Wildcats", "short": "NOVA", "name": "Villanova"},
    {"detail": "Virginia Cavaliers", "short": "UVA", "name": "Virginia"},
    {"detail": "Virginia Tech Hokies", "short": "VATECH", "name": "Virginia Tech"},
    {"detail": "Vmi Keydets", "short": "VMI", "name": "VMI"},
    {"detail": "Wagner Seahawks", "short": "WAGNER", "name": "Wagner"},
    {"detail": "Wake Forest Demon Deacons", "short": "WAKE", "name": "Wake Forest"},
    {"detail": "Washington Huskies", "short": "WASH", "name": "Washington"},
    {"detail": "Washington State Cougars", "short": "WASHST", "name": "Washington State"},
    {"detail": "Weber State Wildcats", "short": "WEBER", "name": "Weber State"},
    {"detail": "West Virginia Mountaineers", "short": "WVU", "name": "West Virginia"},
    {"detail": "Western Carolina Catamounts", "short": "WCAR", "name": "Western Carolina"},
    {"detail": "Western Illinois Leathernecks", "short": "WILL", "name": "Western Illinois"},
    {"detail": "Western Kentucky Hilltoppers", "short": "WKY", "name": "Western Kentucky"},
    {"detail": "Western Michigan Broncos", "short": "WMICH", "name": "Western Michigan"},
    {"detail": "Wichita State Shockers", "short": "WICHST", "name": "Wichita State"},
    {"detail": "William & Mary Tribe", "short": "WMMARY", "name": "William & Mary"},
    {"detail": "Winthrop Eagles", "short": "WINTHR", "name": "Winthrop"},
    {"detail": "Wisconsin Badgers", "short": "WISC", "name": "Wisconsin"},
    {"detail": "Wisconsin Milwaukee Panthers", "short": "MILW", "name": "Wisconsin Milwaukee"},
    {"detail": "Wofford Terriers", "short": "WOFF", "name": "Wofford"},
    {"detail": "Wright State Raiders", "short": "WRIGHT", "name": "Wright State"},
    {"detail": "Wyoming Cowboys", "short": "WYO", "name": "Wyoming"},
    {"detail": "Xavier Musketeers", "short": "XAVIER", "name": "Xavier"},
    {"detail": "Yale Bulldogs", "short": "YALE", "name": "Yale"},
    {"detail": "Youngstown State Penguins", "short": "YOUNG", "name": "Youngstown State"}];
}
