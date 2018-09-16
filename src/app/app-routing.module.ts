import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { FactComponent } from './pages/fact/fact.component';
import { RoleplayComponent } from './pages/roleplay/roleplay.component';
import { CharactersComponent } from './pages/characters/characters.component';
import { AboutComponent } from './pages/about/about.component';

const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'universe', redirectTo: '' },
  { path: 'universe/:id', component: FactComponent },
  { path: 'roleplay', component: RoleplayComponent },
  { path: 'characters', component: CharactersComponent },
  { path: 'about', component: AboutComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
