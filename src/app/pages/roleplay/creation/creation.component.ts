import { Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";
import { RoutesService } from "../../../services/routes.service";
import jsPDF from "jspdf";

@Component({
	selector: "app-creation",
	templateUrl: "./creation.component.html",
	styleUrls: ["./creation.component.scss"],
	providers: [RoutesService]
})
export class CreationComponent {
	public name: string;

	public race: number;
	public avantages: string;
	public inconvenients: string;

	public caracteristics: any;
	public mainSkills: any;
	public crystalSkills: any;

	public initiative: number;
	public pv: number;
	public pe: number;

	public nbPointsCaracteristics: number;
	public nbPointsSkills: number;
	public leftPointsCaracteristics: number;
	public leftPointsSkills: number;

	public armor: any;
	public weapon01: any;
	public weapon02: any;
	public listArmors: Array<any>;
	public listWeapons: Array<any>;

	constructor(
		private routesService: RoutesService,
		private route: ActivatedRoute,
		private translate: TranslateService
	) {
		this.routesService.setTitleMetas("CREATION");
		this.translate
			.get("UNIVERSE.POPULATION.PEOPLE" + this.race + ".AVANTAGES")
			.subscribe((res: string) => {
				this.avantages = res;
			});
		this.translate
			.get("UNIVERSE.POPULATION.PEOPLE" + this.race + ".INCONVENIENTS")
			.subscribe((res: string) => {
				this.inconvenients = res;
			});
		this.caracteristics = {
			vigueur: 1,
			habilete: 1,
			intellect: 1,
			presence: 1,
			pouvoir: 1
		};
		this.mainSkills = {
			animaux: { value: 0, spe: "" },
			art: { value: 0, spe: "" },
			artisanat: { value: 0, spe: "" },
			athletisme: { value: 0, spe: "" },
			combat: { value: 0, spe: "" },
			etiquette: { value: 0, spe: "" },
			furtivite: { value: 0, spe: "" },
			information: { value: 0, spe: "" },
			intuition: { value: 0, spe: "" },
			investigation: { value: 0, spe: "" },
			larcin: { value: 0, spe: "" },
			manipulation: { value: 0, spe: "" },
			medecine: { value: 0, spe: "" },
			persuasion: { value: 0, spe: "" },
			pilotage: { value: 0, spe: "" },
			savoir: { value: 0, spe: "" },
			survie: { value: 0, spe: "" }
		};
		this.crystalSkills = {
			elementaires: { value: 0, spe: "" },
			invocations: { value: 0, spe: "" },
			mentaux: { value: 0, spe: "" },
			transformations: { value: 0, spe: "" },
			spatiauxtemporels: { value: 0, spe: "" },
			speciaux: { value: 0, spe: "" }
		};
		this.nbPointsCaracteristics = 13;
		this.changeRace({ value: 1 });
		this.refreshPoints();
		this.listArmors = [
			{ id: 1, name: 'Vêtements renforcés', defenceBonus: 2, mobility: 'Normale', actionsMalus: 0 },
			{ id: 2, name: 'Armure lègère (cuir, cottes de mailles)', defenceBonus: 4, mobility: 'Normale', actionsMalus: -2 },
			{ id: 3, name: 'Armure lourde (cuirasse, armure complète)', defenceBonus: 6, mobility: 'Réduite', actionsMalus: -4 }
		];
		this.listWeapons = [
			{ id: 1, name: 'Lame courte (dague)', attackBonus: 2, defenceBonus: 2, category: 'Légère' },
			{ id: 2, name: 'Arme à une main (épée longue, hache)', attackBonus: 4, defenceBonus: 0, category: 'Moyenne' },
			{ id: 3, name: 'Arme à deux mains (espadon, grande hache)', attackBonus: 6, defenceBonus: -2, category: 'Lourde' },
			{ id: 4, name: 'Arme d\'hast (lance, hallebarde)', attackBonus: 3, defenceBonus: 1, category: 'Lourde' },
			{ id: 5, name: 'Arme contondante (matraque, bâton)', attackBonus: 1, defenceBonus: 2, category: 'Légère ou Moyenne' },
			{ id: 6, name: 'Arc', attackBonus: 2, count: 1, cooldown: 'Rapide', zone: 25 },
			{ id: 7, name: 'Arbalète', attackBonus: 4, count: 1, cooldown: 'Action', zone: 35 },
			{ id: 8, name: 'Fronde', attackBonus: 0, count: 1, cooldown: 'Rapide', zone: 10 },
			{ id: 9, name: 'Armes de lancer (couteaux)', attackBonus: 2, count: 1, cooldown: 'Rapide', zone: 5 },
			{ id: 10, name: 'Armes à feu lègere (pistolet)', attackBonus: 4, count: 4, cooldown: 'Action', zone: 20 },
			{ id: 11, name: 'Armes à feu lourde (fusil)', attackBonus: 6, count: 2, cooldown: 'Action', zone: 150 },
			{ id: 12, name: 'Bouclier', defenceBonus: 2, mobility: 'Normale', actionsMalus: -2 }
		];
		this.armor = this.listArmors[0];
		this.weapon01 = {};
		this.weapon02 = {};
	}

	changeRace(event) {
		this.race = parseInt(event.value);
		this.translate
			.get("UNIVERSE.POPULATION.PEOPLE" + this.race + ".AVANTAGES")
			.subscribe((res: string) => {
				this.avantages = res;
			});
		this.translate
			.get("UNIVERSE.POPULATION.PEOPLE" + this.race + ".INCONVENIENTS")
			.subscribe((res: string) => {
				this.inconvenients = res;
			});
		switch (this.race) {
			case 1:
				this.pe = 6;
				this.mainSkills.athletisme.value = 1;
				this.nbPointsSkills = 51;
				break;

			case 2:
				this.pe = 8;
				this.nbPointsSkills = 50;
				break;

			case 3:
				this.pe = 8;
				this.mainSkills.animaux.value = 1;
				this.mainSkills.combat.value = 1;
				this.nbPointsSkills = 52;
				break;

			case 4:
				this.pe = 8;
				this.mainSkills.furtivite.value = 1;
				this.mainSkills.manipulation.value = 1;
				this.nbPointsSkills = 52;
				break;

			case 5:
				this.pe = 12;
				this.mainSkills.intuition.value = 1;
				this.mainSkills.medecine.value = 1;
				this.nbPointsSkills = 52;
				break;

			case 6:
				this.pe = 10;
				this.mainSkills.combat.value = 1;
				this.mainSkills.intuition.value = 1;
				this.mainSkills.survie.value = 1;
				this.nbPointsSkills = 53;
				break;

			default:
				break;
		}
		this.refreshPoints();
	}

	changeCaracteristics(event) {
		this.caracteristics[event.type] = parseInt(event.value);
		this.refreshPoints();
	}

	changeMainSkills(event) {
		this.mainSkills[event.type].value = parseInt(event.value);
		this.refreshPoints();
	}

	changeSpeMainSkills(event) {
		this.mainSkills[event.type].spe = event.spe;
		this.refreshPoints();
	}

	changeCrystalSkills(event) {
		this.crystalSkills[event.type].value = parseInt(event.value);
		this.refreshPoints();
	}

	changeSpeCrystalSkills(event) {
		this.crystalSkills[event.type].spe = event.spe;
		this.refreshPoints();
	}

	refreshPoints() {
		var totalCaracteristics = 0;
		for (var key in this.caracteristics) {
			totalCaracteristics += this.caracteristics[key];
		}
		this.leftPointsCaracteristics =
			this.nbPointsCaracteristics - totalCaracteristics;

		var totalSkills = 0;
		for (var key in this.mainSkills) {
			totalSkills += this.mainSkills[key].value;
		}
		for (var key in this.crystalSkills) {
			totalSkills += this.crystalSkills[key].value;
		}
		this.leftPointsSkills = this.nbPointsSkills - totalSkills;

		this.initiative =
			this.caracteristics.habilete + this.caracteristics.intellect;
		this.pv = 10 + 3 * this.caracteristics.vigueur;
	}

	changeArmor(event) {
		this.armor = this.listArmors[0];
		this.listArmors.forEach(element => {
			if (element.id === parseInt(event.value)) this.armor = element;
		});
	}

	changeWeapon01(event) {
		this.weapon01 = {};
		this.listWeapons.forEach(element => {
			if (element.id === parseInt(event.value)) this.weapon01 = element;
		});
	}

	changeWeapon02(event) {
		this.weapon02 = {};
		this.listWeapons.forEach(element => {
			if (element.id === parseInt(event.value)) this.weapon02 = element;
		});
	}

	downloadPDF() {
		var doc = new jsPDF();
		doc.setFontSize(30);
		doc.text(35, 25, "Fiche de personnage");

		this.toDataURL("./assets/images/creation/Fond.png", function(dataUrl) {
			console.log("RESULT:", dataUrl);
			doc.addImage(dataUrl, "JPEG", 15, 40, 180, 160);
			doc.save("a4.pdf");
		});
	}

	toDataURL(url, callback) {
		var xhr = new XMLHttpRequest();
		xhr.onload = function() {
			var reader = new FileReader();
			reader.onloadend = function() {
				callback(reader.result);
			};
			reader.readAsDataURL(xhr.response);
		};
		xhr.open("GET", url);
		xhr.responseType = "blob";
		xhr.send();
	}
}
