import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { HomeComponent } from "./pages/home/home.component";
import { UniverseComponent } from "./pages/universe/universe.component";
import { EvanellComponent } from "./pages/universe/evanell/evanell.component";
import { CelestiaComponent } from "./pages/universe/celestia/celestia.component";
import { ReligionComponent } from "./pages/universe/religion/religion.component";
import { CrystalsComponent } from "./pages/universe/crystals/crystals.component";
import { PopulationComponent } from "./pages/universe/population/population.component";
import { RoleplayComponent } from "./pages/roleplay/roleplay.component";
import { CreationComponent } from "./pages/roleplay/creation/creation.component";
import { ArenartComponent } from "./pages/arenart/arenart.component";
import { AboutComponent } from "./pages/about/about.component";
import { LegacyComponent } from "./pages/legacy/legacy.component";

const appRoutes: Routes = [
  { path: "", component: HomeComponent },
  { path: "universe", component: UniverseComponent },
  { path: "universe/evanell", component: EvanellComponent },
  { path: "universe/celestia", component: CelestiaComponent },
  { path: "universe/religion", component: ReligionComponent },
  { path: "universe/crystals", component: CrystalsComponent },
  { path: "universe/population", component: PopulationComponent },
  { path: "roleplay", component: RoleplayComponent },
  { path: "roleplay/creation", component: CreationComponent },
  { path: "arenart", component: ArenartComponent },
  { path: "about", component: AboutComponent },
  { path: "legacy", component: LegacyComponent },
  { path: "**", redirectTo: "" }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
