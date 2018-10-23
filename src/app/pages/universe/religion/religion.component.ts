import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { RoutesService } from '../../../services/routes.service';

@Component({
  selector: 'app-religion',
  templateUrl: './religion.component.html',
  styleUrls: ['./religion.component.scss'],
  providers: [RoutesService]
})
export class ReligionComponent {

	public entityKabal:string;
	public entityTitle:string;
	public entityComment:string;
	public entityCommentName:string;
	public select:number;

  constructor(private routesService: RoutesService, private route: ActivatedRoute, private translate: TranslateService) {
		this.routesService.setTitleMetas("RELIGION");
		this.changeSelection(1);
	}

	changeSelection(newSelection:number) {
		this.select = newSelection;
		if (this.select <= 10) {
			this.translate.get('UNIVERSE.RELIGION.LIGHTKABAL').subscribe((res: string) => {
				this.entityKabal = this.translate.instant(res);
			});
		} else {
			this.translate.get('UNIVERSE.RELIGION.DARKKABAL').subscribe((res: string) => {
				this.entityKabal = this.translate.instant(res);
			});
		}
	}
}
