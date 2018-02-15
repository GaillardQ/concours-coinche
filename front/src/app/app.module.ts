// Angular CLI
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { PersistenceModule } from 'angular-persistence';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
// Pages
import { HomeComponent } from './pages/home/home.component';
import { GameComponent } from './pages/game/game.component';
import { PlayerListComponent } from './pages/game/player-list/player-list.component';
// Services
import { JsonService } from './shared/services/json.service';
import { UtilsService } from './shared/services/utils.service';
import { PlayerListService } from './pages/game/player-list/player-list.service';
// Conf
import { JSON_FILES } from './shared/config/jsonFiles';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    GameComponent,
    PlayerListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    PersistenceModule,
    AppRoutingModule
  ],
  providers: [
    JsonService,
    UtilsService,
    PlayerListService,
    JSON_FILES
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
