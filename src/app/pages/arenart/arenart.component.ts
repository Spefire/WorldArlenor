import { Component } from '@angular/core';
import { RoutesService } from '../../services/routes.service';

declare var UnityLoader;
declare var UnityProgress;

@Component({
	selector: 'app-arenart',
	templateUrl: './arenart.component.html',
	styleUrls: ['./arenart.component.scss'],
	providers: [RoutesService]
})
export class ArenartComponent {

	public gameInstance: any;
	public isLaunched: boolean;

	constructor(private routesService: RoutesService) {
		this.routesService.setTitleMetas("ARENART");
	}

	launchGame() {
		var unityContainer = document.getElementById("unityContainer");
		if (window.innerWidth > 1200) {
			unityContainer.style.width = "80%";
		} else {
			unityContainer.style.width = "100%";
		}
		this.gameInstance = UnityLoader.instantiate("unityContainer", "../../../assets/unity/Build/HTML.json", {onProgress: UnityProgress});
		this.isLaunched = true;
	}
}
