import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { RoutesService } from '../../services/routes.service';

@Component({
  selector: 'app-universe',
  templateUrl: './universe.component.html',
  styleUrls: ['./universe.component.scss'],
  providers: [ApiService, RoutesService]
})
export class UniverseComponent {

	public select:number;
	public selectedFact:any;

  constructor(private apiService: ApiService, private routesService: RoutesService) {
		this.routesService.setTitleMetas("UNIVERSE");
		this.select = 0;
		this.selectedFact = this.apiService.getFact(this.select);
	}

  setSelection(id:number) {
		this.select = id;
		this.selectedFact = this.apiService.getFact(this.select);
	}
}
