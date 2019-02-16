import { Component, OnInit } from '@angular/core';
import { RoutesService } from '../../services/routes.service';

@Component({
	selector: 'app-roleplay',
	templateUrl: './roleplay.component.html',
	styleUrls: ['./roleplay.component.scss'],
	providers: [RoutesService]
})
export class RoleplayComponent implements OnInit {

	constructor(private routesService: RoutesService) {
		this.routesService.setTitleMetas("ROLEPLAY");
	}

	ngOnInit() {
	}

}
