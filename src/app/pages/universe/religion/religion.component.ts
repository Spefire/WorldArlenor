import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RoutesService } from '../../../services/routes.service';

@Component({
  selector: 'app-religion',
  templateUrl: './religion.component.html',
  styleUrls: ['./religion.component.scss'],
  providers: [RoutesService]
})
export class ReligionComponent {

	public select:number;

  constructor(private routesService: RoutesService, private route: ActivatedRoute) {
		this.routesService.setTitleMetas("RELIGION");
		this.select = 1;
	}

	changeSelection(newSelection:number) {
		this.select = newSelection;
	}
}
