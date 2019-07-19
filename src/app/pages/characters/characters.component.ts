import { Component } from '@angular/core';
import { RoutesService } from '../../services/routes.service';

declare var UnityLoader;
declare var UnityProgress;

@Component({
	selector: 'app-characters',
	templateUrl: './characters.component.html',
	styleUrls: ['./characters.component.scss'],
	providers: [RoutesService]
})
export class CharactersComponent {

	public gameInstance: any;
	public isLaunched: boolean;

	constructor(private routesService: RoutesService) {
		this.routesService.setTitleMetas("CHARACTERS");
	}

	launchGame() {
		this.gameInstance = UnityLoader.instantiate("gameContainer", "../../../assets/unity/Build/HTML.json", {onProgress: UnityProgress});
		this.isLaunched = true;
	}
}
