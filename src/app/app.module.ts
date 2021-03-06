import { BrowserModule } from "@angular/platform-browser";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpModule, RequestOptions } from "@angular/http";
import { HttpClientModule } from "@angular/common/http";
import {
  LocationStrategy,
  HashLocationStrategy,
  CommonModule
} from "@angular/common";

import { NgModule, ApplicationRef } from "@angular/core";
import {
  removeNgStyles,
  createNewHosts,
  createInputTransfer
} from "@angularclass/hmr";
import { RouterModule, PreloadAllModules } from "@angular/router";
import {
  MatToolbarModule,
  MatCardModule,
  MatListModule,
  MatGridListModule,
  MatInputModule,
  MatButtonModule,
  MatExpansionModule
} from "@angular/material";
import "hammerjs";

/*
 * Platform and Environment providers/directives/pipes
 */

import { ENV_PROVIDERS } from "./environment";
import { ROUTES } from "./app.routes";

// Components
import { HomeComponent } from "./home";
import { NavBarComponent } from "./navbar";
import { TeamComponent } from "./team-select/team";

// App is our top level component
import { AppComponent } from "./app.component";
import { APP_RESOLVER_PROVIDERS } from "./app.resolver";
import { AppState, InternalStateType } from "./app.service";

// Modules
import { HomeModule } from './home/home.module';
import { NavBarModule } from './navbar/navbar.module';
import { AuthenticationModule } from './authentication/authentication.module';
import { CreateContestModule } from './createcontest/createcontest.module';
import { TeamSelectModule } from './team-select/team.select.module';
import { UpdateBracketModule } from './updatebracket/updatebracket.module';

// Services
import { AuthenticationService } from "./authentication/authentication.service";
import { ContestService } from "./createcontest/createcontest.service";

//import { angularProfileCard } from '../../components/main-profile/index';
import { NoContentComponent } from "./no-content";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { WebStorageModule } from 'ngx-store';


import "../styles/styles.scss";
import "../styles/headings.css";

// Application wide providers
const APP_PROVIDERS = [...APP_RESOLVER_PROVIDERS, AppState];

type StoreType = {
  state: InternalStateType,
  restoreInputValues: () => void,
  disposeOldHosts: () => void
};

/**
 * `AppModule` is the main entry point into Angular2's bootstraping process
 */
@NgModule({
  bootstrap: [AppComponent],
  declarations: [
    AppComponent,
    NoContentComponent
  ],
  /**
   * Import Angular's modules.
   */
  imports: [
    BrowserAnimationsModule,
    CommonModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HomeModule,
    TeamSelectModule,
    NavBarModule,
    AuthenticationModule,
    CreateContestModule,
    TeamSelectModule,
    UpdateBracketModule,
    HttpModule,
    HttpClientModule,
    MatToolbarModule,
    MatCardModule,
    MatListModule,
    MatGridListModule,
    MatInputModule,
    MatButtonModule,
    MatExpansionModule,
    WebStorageModule,
    RouterModule.forRoot(ROUTES, {
      useHash: false,
      preloadingStrategy: PreloadAllModules
    })
  ],
  /**
   * Expose our Services and Providers into Angular's dependency injection.
   */
  providers: [ENV_PROVIDERS, APP_PROVIDERS, AuthenticationService, ContestService]
})
export class AppModule {
  constructor(public appRef: ApplicationRef, public appState: AppState) { }

  public hmrOnInit(store: StoreType) {
    if (!store || !store.state) {
      return;
    }
    console.log("HMR store", JSON.stringify(store, null, 2));
    /**
     * Set state
     */
    this.appState._state = store.state;
    /**
     * Set input values
     */
    if ("restoreInputValues" in store) {
      let restoreInputValues = store.restoreInputValues;
      setTimeout(restoreInputValues);
    }

    this.appRef.tick();
    delete store.state;
    delete store.restoreInputValues;
  }

  public hmrOnDestroy(store: StoreType) {
    const cmpLocation = this.appRef.components.map(
      cmp => cmp.location.nativeElement
    );
    /**
     * Save state
     */
    const state = this.appState._state;
    store.state = state;
    /**
     * Recreate root elements
     */
    store.disposeOldHosts = createNewHosts(cmpLocation);
    /**
     * Save input values
     */
    store.restoreInputValues = createInputTransfer();
    /**
     * Remove styles
     */
    removeNgStyles();
  }

  public hmrAfterDestroy(store: StoreType) {
    /**
     * Display new elements
     */
    store.disposeOldHosts();
    delete store.disposeOldHosts;
  }
}
