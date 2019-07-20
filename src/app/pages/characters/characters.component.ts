import { Component } from '@angular/core';
import { RoutesService } from '../../services/routes.service';

@Component({
	selector: 'app-characters',
	templateUrl: './characters.component.html',
	styleUrls: ['./characters.component.scss'],
	providers: [RoutesService]
})
export class CharactersComponent {

	constructor(private routesService: RoutesService) {
		this.routesService.setTitleMetas("CHARACTERS");
	}
}
