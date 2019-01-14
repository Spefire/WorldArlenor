import { Component, OnInit } from '@angular/core';
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
	public race:string;
	public caracteristics:any;
	public mainSkills:any;
	public crystalSkills:any;

	public leftPointsCaracteristics:number;
	public leftPointsSkills:number;

  constructor(private routesService: RoutesService) {
		this.routesService.setTitleMetas("CREATION");
		this.caracteristics = {
			vigueur : 1,
			habilete : 1,
			intellect : 1,
			presence : 1,
			pouvoir : 1,
		};
		this.mainSkills = {
			animaux : 1,
			art : 1,
			artisanat : 1,
			athletisme : 1,
			combat : 1,
			etiquette : 1,
			furtivite : 1,
			information : 1,
			intuition : 1,
			investigation : 1,
			larcin : 1,
			manipulation : 1,
			medecine : 1,
			persuasion : 1,
			pilotage : 1,
			savoir : 1,
			survie : 1
		};
		this.crystalSkills = {
			elementaires : 1,
			invocations : 1,
			mentaux : 1,
			transformation : 1,
			spatiauxtemporels : 1,
			speciaux : 1
		};
		this.refreshPoints();
	}
	
	test(type, value) {
		this.caracteristics[type] = parseInt(value);
		this.refreshPoints();
	}

	refreshPoints() {
		var totalCaracteristics = 0;
		for (var key in this.caracteristics) {
			totalCaracteristics += this.caracteristics[key];
		}
		this.leftPointsCaracteristics = 15 - totalCaracteristics;
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
