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

  public coords_faradel:any;
  public coords_jirakan:any;
  public coords_ne:any;
  public coords_se:any;
  public coords_no:any;
  public coords_so:any;
  public coords_celestia:any;
  public listFacts:Fact[];

  constructor(private apiService: ApiService, private routesService: RoutesService) {
    this.routesService.setTitleMetas("UNIVERSE");
  }

  ngOnInit() {
    this.coords_faradel = this.getCoords(coords_faradel);
    this.coords_jirakan = this.getCoords(coords_jirakan);
    this.coords_ne = this.getCoords(coords_ne);
    this.coords_se = this.getCoords(coords_se);
    this.coords_no = this.getCoords(coords_no);
    this.coords_so = this.getCoords(coords_so);
    this.coords_celestia = this.getCoords(coords_celestia);

    this.listFacts = this.apiService.getFacts();

    window.onload = function () {
      var ImageMap = function (map) {
        var areas = map.getElementsByTagName('area');
        var len = areas.length;
        var coords = [];
        var previousWidth = 1800;
        for (var n = 0; n < len; n++) {
          coords[n] = areas[n].coords.split(',');
        }
        this.resize = function () {
          var n, m, clen;
          var x = document.getElementById('map-arlenor').clientWidth / previousWidth;
          for (n = 0; n < len; n++) {
            clen = coords[n].length;
            for (m = 0; m < clen; m++) {
              coords[n][m] *= x;
            }
            areas[n].coords = coords[n].join(',');
          }
          previousWidth = document.getElementById('map-arlenor').clientWidth;
          return true;
        };
        window.onresize = this.resize;
      },
      imageMap = new ImageMap(document.getElementById('map-areas'));
      imageMap.resize();
      return;
    }
  }

  getCoords(coords: any) {
    var final = "";
    var isfirst = true;
    coords.forEach(element => {
      if (isfirst) {
        isfirst = false;
        final += element.x + "," + element.y;
      }
      else {
        final += "," + element.x + "," + element.y;
      }
    });
    return final;
  }
}
