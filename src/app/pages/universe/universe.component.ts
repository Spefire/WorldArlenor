import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { RoutesService } from '../../services/routes.service';

import { coords_faradel, coords_jirakan, coords_celestia,
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
  public coords_celestia:any;
  public coords_ne:any;
  public coords_se:any;
  public coords_no:any;
	public coords_so:any;
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
    this.coords_celestia = getCoords(coords_celestia).split(',');
    this.coords_ne = getCoords(coords_ne).split(',');
    this.coords_se = getCoords(coords_se).split(',');
    this.coords_no = getCoords(coords_no).split(',');
    this.coords_so = getCoords(coords_so).split(',');

    var coords = [
      this.coords_faradel,
      this.coords_jirakan,
      this.coords_celestia,
      this.coords_ne,
      this.coords_se,
      this.coords_no,
      this.coords_so
    ]

    var areas = document.getElementById('map-areas').getElementsByTagName('area');
    var coeff = document.getElementById('map-arlenor').clientWidth / 1800;
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
		} else if (this.selection == "celestia") {
			this.listFacts = this.apiService.getFacts("Celestia");
		} else {
			this.listFacts = this.apiService.getFacts("Zones");
		}
	}
}
