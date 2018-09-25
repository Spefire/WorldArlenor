import { Component, OnInit } from '@angular/core';
import { Fact } from '../../models/fact.model';
import { ApiService } from '../../services/api.service';
import { RoutesService } from '../../services/routes.service';

@Component({
  selector: 'app-universe',
  templateUrl: './universe.component.html',
  styleUrls: ['./universe.component.scss'],
  providers: [ApiService, RoutesService]
})
export class UniverseComponent implements OnInit {

  public listFacts:Fact[];

  constructor(private apiService: ApiService, private routesService: RoutesService) {
    this.routesService.setTitleMetas("UNIVERSE");
  }

  ngOnInit() {
    this.listFacts = this.apiService.getFacts();
  }

  getCoords() {
    var img = document.getElementById('map-arlenor');
    var width = img.clientWidth;
    var base = [
      {x: 545, y: 840},
      {x: 615, y: 1105},
      {x: 410, y: 1090},
      {x: 405, y: 1055},
      {x: 240, y: 1120},
      {x: 50, y: 965},
      {x: 90, y: 820},
      {x: 270, y: 745},
      {x: 340, y: 810},
      {x: 300, y: 890},
      {x: 355, y: 935},
      {x: 490, y: 910}
    ];
    var final = "";
    var isfirst = true;
    var coeff = width / 1800;
    base.forEach(element => {
      if (isfirst) {
        isfirst = false;
        final += element.x * coeff + "," + element.y * coeff;
      }
      else {
        final += "," + element.x * coeff + "," + element.y * coeff;
      }
    });
    return final;
  }
}
