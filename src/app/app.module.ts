import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';

//Import ngx-translate and the http loader
import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {HttpClient, HttpClientModule} from '@angular/common/http';

import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { UniverseComponent } from './pages/universe/universe.component';
import { EvanellComponent } from './pages/universe/evanell/evanell.component';
import { CelestiaComponent } from './pages/universe/celestia/celestia.component';
import { ReligionComponent } from './pages/universe/religion/religion.component';
import { CrystalsComponent } from './pages/universe/crystals/crystals.component';
import { PopulationComponent } from './pages/universe/population/population.component';
import { FactComponent } from './pages/fact/fact.component';
import { RoleplayComponent } from './pages/roleplay/roleplay.component';
import { CharactersComponent } from './pages/characters/characters.component';
import { AboutComponent } from './pages/about/about.component';
import { LegacyComponent } from './pages/legacy/legacy.component';
import { HeadUniverseComponent } from './components/head-universe/head-universe.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
		UniverseComponent,
		EvanellComponent,
		CelestiaComponent,
    ReligionComponent,
    CrystalsComponent,
    PopulationComponent,
    FactComponent,
    RoleplayComponent,
    CharactersComponent,
    AboutComponent,
		LegacyComponent,
		HeadUniverseComponent,
    HeaderComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (HttpLoaderFactory),
        deps: [HttpClient]
      }
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}
