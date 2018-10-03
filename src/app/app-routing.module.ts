import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { UniverseComponent } from './pages/universe/universe.component';
import { ReligionComponent } from './pages/universe/religion/religion.component';
import { CrystalsComponent } from './pages/universe/crystals/crystals.component';
import { PopulationComponent } from './pages/universe/population/population.component';
import { ZonesComponent } from './pages/universe/zones/zones.component';
import { FactComponent } from './pages/fact/fact.component';
import { RoleplayComponent } from './pages/roleplay/roleplay.component';
import { CharactersComponent } from './pages/characters/characters.component';
import { AboutComponent } from './pages/about/about.component';
import { LegacyComponent } from './pages/legacy/legacy.component';

const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'universe', component: UniverseComponent },
  { path: 'universe/religion', component: ReligionComponent },
  { path: 'universe/crystals', component: CrystalsComponent },
  { path: 'universe/population', component: PopulationComponent },
  { path: 'universe/faradel', component: ZonesComponent },
  { path: 'universe/jirakan', component: ZonesComponent },
  { path: 'universe/celestia', component: ZonesComponent },
  { path: 'universe/zones', component: ZonesComponent },
  { path: 'universe/:id', component: FactComponent },
  { path: 'roleplay', component: RoleplayComponent },
  { path: 'characters', component: CharactersComponent },
  { path: 'about', component: AboutComponent },
  { path: 'legacy', component: LegacyComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
