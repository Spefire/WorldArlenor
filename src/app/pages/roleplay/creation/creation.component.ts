import { Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";
import { RoutesService } from "../../../services/routes.service";
import jsPDF from "jspdf";

import { LIST_RACES, LIST_CRYSTALS, LIST_ARMORS, LIST_WEAPONS } from "./../../../models/creation.model";

@Component({
	selector: "app-creation",
	templateUrl: "./creation.component.html",
	styleUrls: ["./creation.component.scss"],
	providers: [RoutesService]
})
export class CreationComponent {
	public race: number;
	public avantages: string;
	public inconvenients: string;

	public caracteristics: any;
	public nbPointsCaracteristics: number;
	public leftPointsCaracteristics: number;
	public initiative: number;
	public pv: number;
	public pe: number;

	public mainSkills: any;
	public crystalSkills: any;
	public nbPointsSkills: number;
	public leftPointsSkills: number;

	public crystal01: any;
	public crystal02: any;
	public crystal03: any;

	public armor: any;
	public weapon01: any;
	public weapon02: any;
	public displayHelpEquipClick: boolean;
	public displayHelpEquipHover: boolean;

	public name: string;
	public description: string;
	public avatar: string;

	public warning: boolean;
	public listWarnings: string;

	public listRaces: any = LIST_RACES;
	public listCrystals: any = LIST_CRYSTALS;
	public listArmors: any = LIST_ARMORS;
	public listWeapons: any = LIST_WEAPONS;

	public help: string;

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
		this.initValues();
		this.refreshPoints();
		this.closePopup();
	}

	initValues() {
		this.caracteristics = {
			vigueur: 1,
			habilete: 1,
			intellect: 1,
			charisme: 1,
			pouvoir: 1
		};
		this.mainSkills = {
			animaux: { value: 0, spe: "" },
			art: { value: 0, spe: "" },
			athletisme: { value: 0, spe: "" },
			combat: { value: 0, spe: "" },
			furtivite: { value: 0, spe: "" },
			information: { value: 0, spe: "" },
			intuition: { value: 0, spe: "" },
			investigation: { value: 0, spe: "" },
			larcin: { value: 0, spe: "" },
			manipulation: { value: 0, spe: "" },
			medecine: { value: 0, spe: "" },
			persuasion: { value: 0, spe: "" },
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

		this.crystal01 = {};
		this.crystal02 = {};
		this.crystal03 = {};

		this.armor = LIST_ARMORS[0];
		this.weapon01 = {};
		this.weapon02 = {};

		this.name = "";
		this.description = "";
		this.avatar = "";

		this.changeRace({ value: 1 });
	}

	openPopup(event: any) {
		if (event) {
			this.help = event.value;
		}	else {
			this.translate
			.get("CREATION.EQUIPEMENT.HELP")
			.subscribe((res: string) => {
				this.help = res;
			});
		}
	}

	closePopup() {
		this.help = "";
	}

	///////////////////////////////////////////////////////////////////////////////////////////////////////
	/////////////                           PART I : RACE                                  ////////////////
	///////////////////////////////////////////////////////////////////////////////////////////////////////

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

		LIST_RACES.forEach(element => {
			if (this.race === element.id) {
				this.pe = element.pe;
				this.nbPointsSkills = element.nbPointsSkills;
			}
		});

		if (this.race == 1) {
			this.mainSkills.athletisme.value = 1;
		} else if (this.race == 3) {
			this.mainSkills.animaux.value = 1;
			this.mainSkills.combat.value = 1;
		} else if (this.race == 4) {
			this.mainSkills.furtivite.value = 1;
			this.mainSkills.manipulation.value = 1;
		} else if (this.race == 5) {
			this.mainSkills.intuition.value = 1;
			this.mainSkills.medecine.value = 1;
		} else if (this.race == 6) {
			this.mainSkills.combat.value = 1;
			this.mainSkills.intuition.value = 1;
			this.mainSkills.survie.value = 1;
		}

		this.refreshPoints();
	}

	///////////////////////////////////////////////////////////////////////////////////////////////////////
	/////////////                           PART II : CARACTERISTICS                       ////////////////
	///////////////////////////////////////////////////////////////////////////////////////////////////////

	changeCaracteristics(event) {
		this.caracteristics[event.type] = parseInt(event.value);
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

		this.checkWarnings();
	}

	///////////////////////////////////////////////////////////////////////////////////////////////////////
	/////////////                           PART III : SKILLS                              ////////////////
	///////////////////////////////////////////////////////////////////////////////////////////////////////

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

	///////////////////////////////////////////////////////////////////////////////////////////////////////
	/////////////                           PART IV : CRYSTALS                             ////////////////
	///////////////////////////////////////////////////////////////////////////////////////////////////////

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
			LIST_CRYSTALS.forEach(element => {
				if (element.rank === event.value) {
					change = true;
					this.crystal01.rank = element.rank;
					this.crystal01.EV = element.EV;
					this.crystal01.demiEV = element.demiEV;
				}
			});
			if (!change) {
				this.crystal01.rank = undefined;
				this.crystal01.EV = undefined;
				this.crystal01.demiEV = undefined;
			}
		} else if (number === 2) {
			let change = false;
			LIST_CRYSTALS.forEach(element => {
				if (element.rank === event.value) {
					change = true;
					this.crystal02.rank = element.rank;
					this.crystal02.EV = element.EV;
					this.crystal02.demiEV = element.demiEV;
				}
			});
			if (!change) {
				this.crystal02.rank = undefined;
				this.crystal02.EV = undefined;
				this.crystal02.demiEV = undefined;
			}
		} else if (number === 3) {
			let change = false;
			LIST_CRYSTALS.forEach(element => {
				if (element.rank === event.value) {
					change = true;
					this.crystal03.rank = element.rank;
					this.crystal03.EV = element.EV;
					this.crystal03.demiEV = element.demiEV;
				}
			});
			if (!change) {
				this.crystal03.rank = undefined;
				this.crystal03.EV = undefined;
				this.crystal03.demiEV = undefined;
			}
		}
		this.refreshPoints();
	}

	///////////////////////////////////////////////////////////////////////////////////////////////////////
	/////////////                           PART V : EQUIPMENT                             ////////////////
	///////////////////////////////////////////////////////////////////////////////////////////////////////

	changeArmor(event) {
		this.armor = LIST_ARMORS[0];
		LIST_ARMORS.forEach(element => {
			if (element.id === parseInt(event.value)) this.armor = element;
		});
		this.checkWarnings();
	}

	changeWeapon01(event) {
		this.weapon01 = {};
		LIST_WEAPONS.forEach(element => {
			if (element.id === parseInt(event.value)) this.weapon01 = element;
		});
		this.checkWarnings();
	}

	changeWeapon02(event) {
		this.weapon02 = {};
		LIST_WEAPONS.forEach(element => {
			if (element.id === parseInt(event.value)) this.weapon02 = element;
		});
		this.checkWarnings();
	}

	toogleHelpEquip() {
		this.displayHelpEquipClick = !this.displayHelpEquipClick;
	}

	///////////////////////////////////////////////////////////////////////////////////////////////////////
	/////////////                           PART VI : IDENTITY                             ////////////////
	///////////////////////////////////////////////////////////////////////////////////////////////////////

	changeName(event) {
		this.name = event.value;
		this.checkWarnings();
	}

	changeDescription(event) {
		this.description = event.value;
		this.checkWarnings();
	}

	changeAvatar(event) {
		var file = event.files[0];
		if (!file) return;
		if (file.size > 2000000) {
			alert("Warning (Max size : 2 Mo)");
		} else {
			var image64;
			const promiseGetImage64 = new Promise(function(resolve, reject) {
				var reader = new FileReader();
				reader.readAsDataURL(file);
				reader.onload = function() {
					image64 = reader.result;
					return resolve(true);
				};
				reader.onerror = function(error) {
					console.log(error);
				};
			});
			Promise.all([promiseGetImage64]).then(() => {
				this.avatar = image64;
				this.checkWarnings();
			});
		}
	}

	///////////////////////////////////////////////////////////////////////////////////////////////////////
	/////////////                                CONCLUSION                                ////////////////
	///////////////////////////////////////////////////////////////////////////////////////////////////////

	checkWarnings() {
		var infos = "";
		if (this.leftPointsCaracteristics > 0) {
			infos += "Il reste des points de caractéristiques à dépenser.<br>";
		}
		if (this.leftPointsCaracteristics < 0) {
			infos += "Vous avez dépensé trop de points de caractéristiques (votre personnage a déjà obtenu de l'eXPérience ?).<br>";
		}
		if (this.pv <= 0) {
			infos += "Votre personne n'a plus de points de Vie... Attention lors que vous êtes arlénien, vous perdez des PV à chaque cristal tatoué sur le corps.<br>";
		}

		if (this.leftPointsSkills > 0) {
			infos += "Il reste des points de compétences à dépenser.<br>";
		}
		if (this.leftPointsSkills < 0) {
			infos += "Vous avez dépensé trop de points de compétences (votre personnage a déjà obtenu de l'eXPérience ?).<br>";
		}

		if (!this.crystal01.name && !this.crystal02.name && !this.crystal03.name) {
			infos += "Votre personnage n'a pas de cristal. (Est-ce voulu ?)<br>";
		}

		if ((this.crystal01.name && this.crystal01.rank === "S") || (this.crystal02.name && this.crystal02.rank === "S") || (this.crystal03.name && this.crystal03.rank === "S")) {
			infos += "Votre personnage a un cristal de rang S (votre personnage l'a obtenu via l'eXPérience ?).<br>";
		}

		if (!this.weapon01.name && !this.weapon02.name) {
			infos += "Votre personnage n'a pas d'armes. (Est-ce voulu ?).<br>";
		}

		if (this.name.length <= 0) {
			infos += "Votre personnage n'a pas de nom.<br>";
		}
		if (this.description.length <= 0) {
			infos += "Votre personnage n'a pas de description.<br>";
		}
		if (this.avatar.length <= 0) {
			infos += "Votre personnage n'a pas d'avatar.<br>";
		}
		this.warning = infos.length > 0;
		if (this.warning)	this.listWarnings = "<b>Vous avez des éléments manquants ou des incohérences dans votre fiche :</b><br><br>" + infos;
	}

	loadJSON(event) {
		var file = event.files[0];
		if (!file) return;
		if (file.size > 2000000) {
			alert("Warning (Max size : 2 Mo)");
		} else {
			var parameters;
			const promiseGetParameters = new Promise(function(resolve, reject) {
				var reader = new FileReader();
				reader.readAsText(file);
				reader.onload = function() {
					parameters = JSON.parse( reader.result.toString() );
					return resolve(true);
				};
				reader.onerror = function(error) {
					console.log(error);
				};
			});
			Promise.all([promiseGetParameters]).then(() => {
				this.caracteristics = parameters.caracteristics;
				this.mainSkills = parameters.mainSkills;
				this.crystalSkills = parameters.crystalSkills;
				this.nbPointsCaracteristics = parameters.nbPointsCaracteristics;
				this.crystal01 = parameters.crystal01;
				this.crystal02 = parameters.crystal02;
				this.crystal03 = parameters.crystal03;
				this.armor = parameters.armor;
				this.weapon01 = parameters.weapon01;
				this.weapon02 = parameters.weapon02;
				this.name = parameters.name;
				this.description = parameters.description;
				this.avatar = parameters.avatar;
				this.changeRace({ value: parameters.race });
				this.checkWarnings();
				alert("Importation du personnage réussie !");
			});
		}
	}

	downloadJSON() {
		var parameters = {
			caracteristics: this.caracteristics,
			mainSkills: this.mainSkills,
			crystalSkills: this.crystalSkills,
			nbPointsCaracteristics: this.nbPointsCaracteristics,
			crystal01: this.crystal01,
			crystal02: this.crystal02,
			crystal03: this.crystal03,
			armor: this.armor,
			weapon01: this.weapon01,
			weapon02: this.weapon02,
			name: this.name,
			description: this.description,
			avatar: this.avatar,
			race: this.race
		}
		var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(parameters));
		var dlAnchorElem = document.getElementById('creation-save-parameters');
		dlAnchorElem.setAttribute("href", dataStr);
		dlAnchorElem.setAttribute("download", "Arlenor_Save_" + this.name + ".json");
	}

	downloadPDF() {

		if (this.warning) {
			if (!confirm("Attention : Votre fiche de personnage contient des avertissements. Voulez-vous quand même télécharger cette fiche ?")) {
				return;
			}
		}

		var doc = new jsPDF("p", "px", "a4");
		var width = doc.internal.pageSize.getWidth();
		var height = doc.internal.pageSize.getHeight();

		function toDataURL(url, callback) {
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

		const promise = new Promise(function(resolve, reject) {
			toDataURL("./assets/images/creation/emptyFile.jpg", function(dataUrl) {
				doc.addImage(dataUrl, "JPEG", 0, 0, width, height);
				doc.setFontSize(10);
				return resolve(true);
			});
		});

		Promise.all([promise]).then(() => {
			doc.text(122, 90.5, "" + this.name);
			if (this.avatar) doc.addImage(this.avatar, "JPEG", 25, 20, 81.5, 73);
			doc.text(29.3, 134, "" + this.description, {
				align: "justify",
				maxWidth: 181
			});

			LIST_RACES.forEach(element => {
				if (this.race === element.id) {
					doc.text(122, 175, element.name);
				}
			});

			var i = 217.2;
			for (var key in this.caracteristics) {
				doc.text(132.5, i, "" + this.caracteristics[key], { align: "center" });
				i += 21.2;
			}

			i = 365.6;
			doc.text(132.5, i, "" + this.initiative, { align: "center" });
			i += 21.2;
			doc.text(132.5, i, "" + this.pv, { align: "center" });
			i += 21.2;
			doc.text(132.5, i, "" + this.pe, { align: "center" });

			i = 513.2;
			if (this.armor.name) {
				let res = (this.armor.name.indexOf(" (") > 0) ? this.armor.name.substring(0, this.armor.name.indexOf(" (")) : this.armor.name;
				doc.text(29.3, i, "" + res);
			}
			if (this.armor.attackBonus) doc.text(132.5, i, "" + this.armor.attackBonus, { align: "center" });
			if (this.armor.defenceBonus) doc.text(199, i, "" + this.armor.defenceBonus, { align: "center" });
			i += 10.6;
			if (this.weapon01.name) {
				let res =  (this.weapon01.name.indexOf(" (") > 0) ? this.weapon01.name.substring(0, this.weapon01.name.indexOf(" (")) : this.weapon01.name;
				doc.text(29.3, i, "" + res);
			}
			if (this.weapon01.attackBonus) doc.text(132.5, i, "" + this.weapon01.attackBonus, { align: "center" });
			if (this.weapon01.defenceBonus) doc.text(199, i, "" + this.weapon01.defenceBonus, { align: "center" });
			i += 10.6;
			if (this.weapon02.name) {
				let res = (this.weapon02.name.indexOf(" (") > 0) ? this.weapon02.name.substring(0, this.weapon02.name.indexOf(" (")) : this.weapon02.name;
				doc.text(29.3, i, "" + res);
			}
			if (this.weapon02.attackBonus) doc.text(132.5, i, "" + this.weapon02.attackBonus, { align: "center" });
			if (this.weapon02.defenceBonus) doc.text(199, i, "" + this.weapon02.defenceBonus, { align: "center" });

			i = 587.6;
			if (this.crystal01.name && this.crystal01.type && this.crystal01.rank) {
				doc.text(29.3, i, "" + this.crystal01.name);
				doc.text(132.5, i, "" + this.crystal01.type, { align: "center" });
				doc.text(165.7, i, "" + this.crystal01.rank, { align: "center" });
				if (this.race !== 6) doc.text(199, i, "" + this.crystal01.EV, { align: "center" });
				if (this.race === 6) doc.text(199, i, "" + this.crystal01.demiEV, { align: "center" });
			}
			i += 10.6;
			if (this.crystal02.name && this.crystal02.type && this.crystal02.rank) {
				doc.text(29.3, i, "" + this.crystal02.name);
				doc.text(132.5, i, "" + this.crystal02.type, { align: "center" });
				doc.text(165.7, i, "" + this.crystal02.rank, { align: "center" });
				if (this.race !== 6) doc.text(199, i, "" + this.crystal02.EV, { align: "center" });
				if (this.race === 6) doc.text(199, i, "" + this.crystal02.demiEV, { align: "center" });
			}
			i += 10.6;
			if (this.crystal03.name && this.crystal03.type && this.crystal03.rank) {
				doc.text(29.3, i, "" + this.crystal03.name);
				doc.text(132.5, i, "" + this.crystal03.type, { align: "center" });
				doc.text(165.7, i, "" + this.crystal03.rank, { align: "center" });
				if (this.race !== 6) doc.text(199, i, "" + this.crystal03.EV, { align: "center" });
				if (this.race === 6) doc.text(199, i, "" + this.crystal03.demiEV, { align: "center" });
			}

			i = 90.4;
			for (var key in this.mainSkills) {
				doc.text(326.5, i, "" + this.mainSkills[key].value, {	align: "center"	});
				doc.setFontSize(8);
				let res = (this.mainSkills[key].spe.length > 18) ? this.mainSkills[key].spe.slice(0, 17)+"." : this.mainSkills[key].spe;
				doc.text(391.2, i, "" + res, {align: "center" });
				doc.setFontSize(10);
				i += 21.2;
			}

			i = 470.6;
			for (var key in this.crystalSkills) {
				doc.text(326.5, i, "" + this.crystalSkills[key].value, {align: "center" });
				doc.setFontSize(8);
				let res = (this.crystalSkills[key].spe.length > 18) ? this.crystalSkills[key].spe.slice(0, 17)+"." : this.crystalSkills[key].spe;
				doc.text(391.2, i, "" + res, {align: "center" });
				doc.setFontSize(10);
				i += 21.2;
			}

			doc.save("Arlenor_" + this.name + ".pdf");
		});
	}
}
