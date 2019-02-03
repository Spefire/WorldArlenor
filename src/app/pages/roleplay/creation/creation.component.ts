import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { RoutesService } from '../../../services/routes.service';
import jsPDF from 'jspdf';

@Component({
  selector: 'app-creation',
  templateUrl: './creation.component.html',
  styleUrls: ['./creation.component.scss'],
  providers: [RoutesService]
})
export class CreationComponent {

	public name:string;

	public race:number;
	public avantages:string;
	public inconvenients:string;

	public caracteristics:any;
	public mainSkills:any;
	public crystalSkills:any;

	public initiative:number;
	public pv:number;
	public pe:number;

	public leftPointsCaracteristics:number;
	public leftPointsSkills:number;

  constructor(private routesService: RoutesService, private route: ActivatedRoute, private translate: TranslateService) {
		this.routesService.setTitleMetas("CREATION");
		this.translate.get('UNIVERSE.POPULATION.PEOPLE'+this.race+'.AVANTAGES').subscribe((res: string) => {
			this.avantages = res;
		});
		this.translate.get('UNIVERSE.POPULATION.PEOPLE'+this.race+'.INCONVENIENTS').subscribe((res: string) => {
			this.inconvenients = res;
		});
		this.caracteristics = {
			vigueur : 1,
			habilete : 1,
			intellect : 1,
			presence : 1,
			pouvoir : 1,
		};
		this.mainSkills = {
			animaux : 0,
			art : 0,
			artisanat : 0,
			athletisme : 0,
			combat : 0,
			etiquette : 0,
			furtivite : 0,
			information : 0,
			intuition : 0,
			investigation : 0,
			larcin : 0,
			manipulation : 0,
			medecine : 0,
			persuasion : 0,
			pilotage : 0,
			savoir : 0,
			survie : 0
		};
		this.crystalSkills = {
			elementaires : 0,
			invocations : 0,
			mentaux : 0,
			transformation : 0,
			spatiauxtemporels : 0,
			speciaux : 0
		};
		this.changeRace({value : 1});
		this.refreshPoints();
	}
	
	changeRace(event) {
		this.race = parseInt(event.value);
		this.translate.get('UNIVERSE.POPULATION.PEOPLE'+this.race+'.AVANTAGES').subscribe((res: string) => {
			this.avantages = res;
		});
		this.translate.get('UNIVERSE.POPULATION.PEOPLE'+this.race+'.INCONVENIENTS').subscribe((res: string) => {
			this.inconvenients = res;
		});
		switch (this.race) {
			case 1:
			this.pe = 6;
			this.mainSkills.athletisme = 1;
				break;
		
			case 2:
			this.pe = 8;
				break;

			case 3:
			this.pe = 8;
			this.mainSkills.animaux = 1;
			this.mainSkills.combat = 1;
				break;

			case 4:
			this.pe = 8;
			this.mainSkills.furtivite = 1;
			this.mainSkills.manipulation = 1;
				break;

			case 5:
			this.pe = 12;
			this.mainSkills.intuition = 1;
			this.mainSkills.medecine = 1;
				break;

			case 6:
			this.pe = 10;
			this.mainSkills.combat = 1;
			this.mainSkills.intuition = 1;
			this.mainSkills.survie = 1;
				break;

			default:
				break;
		}
	}

	changeCaracteristics(event) {
		this.caracteristics[event.type] = parseInt(event.value);
		this.refreshPoints();
	}

	changeMainSkills(event) {
		this.mainSkills[event.type] = parseInt(event.value);
		this.refreshPoints();
	}

	changeCrystalSkills(event) {
		this.crystalSkills[event.type] = parseInt(event.value);
		this.refreshPoints();
	}

	refreshPoints() {
		var totalCaracteristics = 0;
		for (var key in this.caracteristics) {
			totalCaracteristics += this.caracteristics[key];
		}
		this.leftPointsCaracteristics = 13 - totalCaracteristics;

		var totalSkills = 0;
		for (var key in this.mainSkills) {
			totalSkills += this.mainSkills[key];
		}
		for (var key in this.crystalSkills) {
			totalSkills += this.crystalSkills[key];
		}
		this.leftPointsSkills = 50 - totalSkills;

		this.initiative = this.caracteristics.habilete + this.caracteristics.intellect;
		this.pv = 10 + 3 * this.caracteristics.vigueur;
	}

	downloadPDF() {
		var doc = new jsPDF();
		doc.setFontSize(30);
		doc.text(35, 25, 'Fiche de personnage');

		this.toDataURL('./assets/images/creation/Fond.png', function(dataUrl) {
			console.log('RESULT:', dataUrl);
			doc.addImage(dataUrl, 'JPEG', 15, 40, 180, 160);
			doc.save("a4.pdf");
		})
	}

	toDataURL(url, callback) {
		var xhr = new XMLHttpRequest();
		xhr.onload = function() {
			var reader = new FileReader();
			reader.onloadend = function() {
				callback(reader.result);
			}
			reader.readAsDataURL(xhr.response);
		};
		xhr.open('GET', url);
		xhr.responseType = 'blob';
		xhr.send();
	}
}
