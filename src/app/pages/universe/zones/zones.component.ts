import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { Fact } from '../../../models/fact.model';
import { ApiService } from '../../../services/api.service';
import { RoutesService } from '../../../services/routes.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-zones',
  templateUrl: './zones.component.html',
  styleUrls: ['./zones.component.scss'],
  providers: [ApiService, RoutesService]
})
export class ZonesComponent {

  public title:string;
  public logoSrc:string;
  public backgroundSrc:string;
  public factsZone:string;
  public route:string;
  public listFacts:Fact[];

  constructor(private apiService: ApiService, private routesService: RoutesService, private translate: TranslateService, location: Location, router: Router) {
    this.routesService.setTitleMetas("UNIVERSE");
    router.events.subscribe((val) => {
      var currentLocation = location.path();
      this.route = currentLocation.split("/")[2];
      if (this.route == "faradel") {
        this.listFacts = this.apiService.getFacts("Faradel");
        this.translate.get('UNIVERSE.FARADEL.TITLE').subscribe((res: string) => {
          this.title = res;
        });
      } else if (this.route == "jirakan") {
        this.listFacts = this.apiService.getFacts("Jirakan");
        this.translate.get('UNIVERSE.JIRAKAN.TITLE').subscribe((res: string) => {
          this.title = res;
        });
      } else if (this.route == "celestia") {
        this.listFacts = this.apiService.getFacts("Celestia");
        this.translate.get('UNIVERSE.CELESTIA.TITLE').subscribe((res: string) => {
          this.title = res;
        });
      } else {
        this.listFacts = this.apiService.getFacts("Zones");
        this.translate.get('UNIVERSE.ZONES.TITLE').subscribe((res: string) => {
          this.title = res;
        });
      }
      this.logoSrc = "https://via.placeholder.com/200x200";
      this.backgroundSrc = "https://via.placeholder.com/1000x400";
    });
  }
}
