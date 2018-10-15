import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { RoutesService } from '../../services/routes.service';

import { coords_faradel, coords_jirakan, coords_imerys, coords_kazador, coords_lumeck, coords_zones } from '../../models/map.model';

@Component({
  selector: 'app-universe',
  templateUrl: './universe.component.html',
  styleUrls: ['./universe.component.scss'],
  providers: [ApiService, RoutesService]
})
export class UniverseComponent implements OnInit {

  public coords_faradel:any;
  public coords_jirakan:any;
	public coords_imerys:any;
  public coords_kazador:any;
  public coords_lumeck:any;
  public coords_zones:any;
	public logoSrc:string;
  public listFacts:any[];

  private selection:string;

  constructor(private apiService: ApiService, private routesService: RoutesService) {
    this.routesService.setTitleMetas("UNIVERSE");
		this.listFacts = this.apiService.getFacts("Faradel");
  }

  ngOnInit() {
		this.selection = "faradel";
		this.logoSrc = "https://via.placeholder.com/200x200";
    this.resizeMap();
		window.onresize = this.resizeMap;
  }

  resizeMap() {
    var map_areas = document.getElementById('map-areas');
    if (map_areas == undefined) return;

    var getCoords = function(coords: any) {
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

    this.coords_faradel = getCoords(coords_faradel).split(',');
    this.coords_jirakan = getCoords(coords_jirakan).split(',');
    this.coords_imerys = getCoords(coords_imerys).split(',');
    this.coords_kazador = getCoords(coords_kazador).split(',');
    this.coords_lumeck = getCoords(coords_lumeck).split(',');
    this.coords_zones = getCoords(coords_zones).split(',');

    var coords = [
      this.coords_faradel,
      this.coords_jirakan,
      this.coords_imerys,
      this.coords_kazador,
      this.coords_lumeck,
      this.coords_zones
    ]

    var areas = document.getElementById('map-areas').getElementsByTagName('area');
    var coeff = document.getElementById('map-arlenor').clientWidth / 1600;
    coords.forEach((element, index) => {
      var clen = element.length;
      for (var n = 0; n < clen; n++) {
        element[n] *= coeff;
      }
      areas[index].coords = element.join(',');
    });
	}

  setSelection(select:string) {
    document.images['map-arlenor'].src='assets/images/map_'+select+'.png';
		this.selection = select;
		if (this.selection == "faradel") {
			this.listFacts = this.apiService.getFacts("Faradel");
		} else if (this.selection == "jirakan") {
			this.listFacts = this.apiService.getFacts("Jirakan");
		} else if (this.selection == "imerys") {
			this.listFacts = this.apiService.getFacts("Imerys");
		} else if (this.selection == "kazador") {
			this.listFacts = this.apiService.getFacts("Kazador");
		} else if (this.selection == "lumeck") {
			this.listFacts = this.apiService.getFacts("Lumeck");
		} else {
			this.listFacts = this.apiService.getFacts("Zones");
		}
	}
}
