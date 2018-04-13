import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { BracketComponent } from './bracket/bracket.component';
import { BoxselectComponent } from './boxselect/boxselect.component';


@NgModule({
  declarations: [
    AppComponent,
    BracketComponent,
    BoxselectComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
