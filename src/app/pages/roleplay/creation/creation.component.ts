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
	public description: string;
	public avatar: string;

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

	public crystal01: any;
	public crystal02: any;
	public crystal03: any;
	public listCrystals: Array<any>;

	public armor: any;
	public weapon01: any;
	public weapon02: any;
	public listArmors: Array<any>;
	public listWeapons: Array<any>;
	public displayHelpEquipClick: boolean;
	public displayHelpEquipHover: boolean;

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
		this.listCrystals = [
			{ id: 1, rank: 'S', rarity: "Unique", power: 'Extrême', EV: 5, demiPV: 10, demiEV: 3 },
			{ id: 2, rank: 'A', rarity: "Rare", power: 'Forte', EV: 3, demiPV: 5, demiEV: 2 },
			{ id: 3, rank: 'B', rarity: "Peu rare", power: 'Moyenne', EV: 2, demiPV: 3, demiEV: 1 },
			{ id: 4, rank: 'C', rarity: "Commune", power: 'Faible', EV: 1, demiPV: 1, demiEV: 0 },
			{ id: 5, rank: 'D', rarity: "Très commune", power: 'Nulle', EV: 0, demiPV: 0, demiEV: 0 }
		];
		this.crystal01 = {};
		this.crystal02 = {};
		this.crystal03 = {};
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
			if (this.mainSkills[key].spe) totalSkills += 2;
		}
		for (var key in this.crystalSkills) {
			totalSkills += this.crystalSkills[key].value;
			if (this.crystalSkills[key].spe) totalSkills += 2;
		}
		this.leftPointsSkills = this.nbPointsSkills - totalSkills;

		this.initiative =
			this.caracteristics.habilete + this.caracteristics.intellect;
		this.pv = 10 + 3 * this.caracteristics.vigueur;

		if (this.race === 6) {
			if (this.crystal01.name && this.crystal01.type) this.pv = this.pv - this.crystal01.demiPV;
			if (this.crystal02.name && this.crystal02.type) this.pv = this.pv - this.crystal02.demiPV;
			if (this.crystal03.name && this.crystal03.type) this.pv = this.pv - this.crystal03.demiPV;
		}
	}

	changeCrystalName(number, event) {
		if (number === 1) {
			this.crystal01.name = event.value;
		} else if (number === 2) {
			this.crystal02.name = event.value;
		} else if (number === 3) {
			this.crystal03.name = event.value;
		}
		this.refreshPoints();
	}

	changeCrystalType(number, event) {
		if (number === 1) {
			this.crystal01.type = event.value;
		} else if (number === 2) {
			this.crystal02.type = event.value;
		} else if (number === 3) {
			this.crystal03.type = event.value;
		}
		this.refreshPoints();
	}

	changeCrystalRank(number, event) {
		if (number === 1) {
			let change = false;
			this.listCrystals.forEach(element => {
				if (element.rank === event.value) {
					change = true;
					this.crystal01.rank = element.rank;
					this.crystal01.EV = element.EV;
					this.crystal01.demiPV = element.demiPV;
					this.crystal01.demiEV = element.demiEV;
				}
			});
			if (!change) {
				this.crystal01.rank = undefined;
				this.crystal01.EV = undefined;
				this.crystal01.demiPV = undefined;
				this.crystal01.demiEV = undefined;
			}
		} else if (number === 2) {
			let change = false;
			this.listCrystals.forEach(element => {
				if (element.rank === event.value) {
					change = true;
					this.crystal02.rank = element.rank;
					this.crystal02.EV = element.EV;
					this.crystal02.demiPV = element.demiPV;
					this.crystal02.demiEV = element.demiEV;
				}
			});
			if (!change) {
				this.crystal02.rank = undefined;
				this.crystal02.EV = undefined;
				this.crystal02.demiPV = undefined;
				this.crystal02.demiEV = undefined;
			}
		} else if (number === 3) {
			let change = false;
			this.listCrystals.forEach(element => {
				if (element.rank === event.value) {
					change = true;
					this.crystal03.rank = element.rank;
					this.crystal03.EV = element.EV;
					this.crystal03.demiPV = element.demiPV;
					this.crystal03.demiEV = element.demiEV;
				}
			});
			if (!change) {
				this.crystal03.rank = undefined;
				this.crystal03.EV = undefined;
				this.crystal03.demiPV = undefined;
				this.crystal03.demiEV = undefined;
			}
		}
		this.refreshPoints();
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

	toogleHelpEquip() {
		this.displayHelpEquipClick = !this.displayHelpEquipClick;
	}

	changeName(event) {
		this.name = event.value;
	}

	changeDescription(event) {
		this.description = event.value;
	}

	changeAvatar(event) {
		var file = event.files[0];
		if (!file) return;
		if (file.size > 2000000) {
			alert("Warning (Max size : 2 Mo)");
		} else {
			var image64;
			const promiseGetImage64 = new Promise(function(resolve, reject){
				var reader = new FileReader();
				reader.readAsDataURL(file);
				reader.onload = function () {
					image64 = reader.result;
					return resolve(true);
				};
				reader.onerror = function (error) {
					console.log(error);
				};
			});
			Promise.all([promiseGetImage64]).then(() => {
				this.avatar = image64;
			})
		}
	}

	downloadPDF() {
		var isOk = true;
		if (this.leftPointsCaracteristics < 0) {
			if (!confirm('Vous avez trop de points dans les Caractéristiques : votre personnage a eu de l\'expérience ?\n\nOK pour continuer quand même, Annuler pour retourner à la création.')) {
				isOk = false;
			}
		}
		if (this.leftPointsSkills < 0) {
			if (!confirm('Vous avez trop de points dans les Compétences : votre personnage a eu de l\'expérience ?\n\nOK pour continuer quand même, Annuler pour retourner à la création.')) {
				isOk = false;
			}
		}
		if (!isOk) return;

		var doc = new jsPDF('p', 'px', 'a4');
		//doc.setFontSize(30);
		//doc.text(35, 25, "Fiche de personnage");

		var width = doc.internal.pageSize.getWidth();
		var height = doc.internal.pageSize.getHeight();

		this.toDataURL("./assets/images/creation/emptyFile.jpg", function(dataUrl) {
			doc.addImage(dataUrl, "JPEG", 0, 0, width, height);
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
