import { Component, OnInit } from '@angular/core';
import { RoutesService } from '../../services/routes.service';

declare var UnityLoader;
declare var UnityProgress;

@Component({
	selector: 'app-characters',
	templateUrl: './characters.component.html',
	styleUrls: ['./characters.component.scss'],
	providers: [RoutesService]
})
export class CharactersComponent implements OnInit {

	public gameInstance: any;

	constructor(private routesService: RoutesService) {
		this.routesService.setTitleMetas("CHARACTERS");
	}

	ngOnInit() {
		this.gameInstance = UnityLoader.instantiate("gameContainer", "../../../assets/unity/Build/Builds.json", {onProgress: UnityProgress});
	}

}
