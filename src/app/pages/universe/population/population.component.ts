import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { RoutesService } from '../../../services/routes.service';

@Component({
	selector: 'app-population',
	templateUrl: './population.component.html',
	styleUrls: ['./population.component.scss'],
	providers: [RoutesService]
})
export class PopulationComponent {

	public peopleTitle: string;
	public peopleText01: string;
	public peopleText02: string;
	public peopleLocation: string;
	public select: number;

	constructor(private routesService: RoutesService, private route: ActivatedRoute, private translate: TranslateService) {
		this.routesService.setTitleMetas("POPULATION");
		this.changeSelection(1);
	}

	previousSelection() {
		if (this.select == 1) this.changeSelection(6);
		else this.changeSelection(this.select - 1);
	}

	nextSelection() {
		if (this.select == 6) this.changeSelection(1);
		else this.changeSelection(this.select + 1);
	}

	changeSelection(newSelection: number) {
		this.select = newSelection;
		this.translate.get('UNIVERSE.POPULATION.PEOPLE' + this.select + '.TITLE').subscribe((res: string) => {
			this.peopleTitle = res;
		});
		this.translate.get('UNIVERSE.POPULATION.PEOPLE' + this.select + '.TEXT01').subscribe((res: string) => {
			this.peopleText01 = res;
		});
		this.translate.get('UNIVERSE.POPULATION.PEOPLE' + this.select + '.TEXT02').subscribe((res: string) => {
			this.peopleText02 = res;
		});
		this.translate.get('UNIVERSE.POPULATION.PEOPLE' + this.select + '.LOCATION').subscribe((res: string) => {
			this.peopleLocation = res;
		});
	}
}
