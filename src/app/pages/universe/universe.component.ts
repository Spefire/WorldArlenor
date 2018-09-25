import { Component, OnInit } from '@angular/core';
import { Fact } from '../../models/fact.model';
import { ApiService } from '../../services/api.service';
import { RoutesService } from '../../services/routes.service';

import { coords_celestia, coords_faradel, coords_jirakan,
  coords_ne, coords_se, coords_no, coords_so } from '../../models/map.model';

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

  getCoords(name: string) {
    var img = document.getElementById('map-arlenor');
    var width = img.clientWidth;

    var coords;
    if (name == "faradel") coords = coords_faradel;
    else if (name == "jirakan") coords = coords_jirakan;
    else if (name == "ne") coords = coords_ne;
    else if (name == "se") coords = coords_se;
    else if (name == "no") coords = coords_no;
    else if (name == "so") coords = coords_so;
    else coords = coords_celestia;

    var final = "";
    var isfirst = true;
    var coeff = width / 1800;
    coords.forEach(element => {
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
