import { Routes } from '@angular/router';
import { HomepageButtonsComponent } from './homepageButtons/homepageButtons.component'
import { GameComponent } from './game/game.component'
import { HostGameComponent } from './host-game/host-game.component';
import { JoinGameComponent } from './join-game/join-game.component';

export const routes: Routes = [
  { path: '', component:HomepageButtonsComponent},
  { path: 'LinkHome', component:HomepageButtonsComponent},
  { path: 'LinkGame', component: GameComponent},
  { path: 'LinkHostGame', component: HostGameComponent},
  { path: 'LinkJoinGame', component: JoinGameComponent},
  { path: '**', component: HomepageButtonsComponent },
];
