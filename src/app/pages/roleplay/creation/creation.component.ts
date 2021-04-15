import { Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";
import { RoutesService } from "../../../services/routes.service";
import jsPDF from "jspdf";

import { LIST_RACES, LIST_ARMORS, LIST_WEAPONS, LIST_TYPE } from "./../../../models/creation.model";

@Component({
  selector: "app-creation",
  templateUrl: "./creation.component.html",
  styleUrls: ["./creation.component.scss"],
  providers: [RoutesService],
})
export class CreationComponent {
  public race: number;
  public avantages: string;
  public inconvenients: string;

  public caracteristics: any;
  public nbPointsCaracteristics: number;
  public leftPointsCaracteristics: number;
  public initiative: number;

  public mainSkills: any;
  public nbPointsMainSkills: number;
  public leftPointsMainSkills: number;

  public health01: number;
  public health02: number;
  public health03: number;
  public health04: number;

  public crystals: any[];
  public nbPointsCrystals: number;
  public leftPointsCrystals: number;

  public armor: any;
  public weapon01: any;
  public weapon02: any;

  public name: string;
  public description: string;
  public avatar: string;

  public warning: boolean;
  public listWarnings: string;

  public listRaces: any = LIST_RACES;
  public listTypes: any = LIST_TYPE;
  public listArmors: any = LIST_ARMORS;
  public listWeapons: any = LIST_WEAPONS;

  public help: string;

  constructor(private routesService: RoutesService, private route: ActivatedRoute, private translate: TranslateService) {
    this.routesService.setTitleMetas("CREATION");
    this.translate.get("UNIVERSE.POPULATION.PEOPLE" + this.race + ".AVANTAGES").subscribe((res: string) => {
      this.avantages = res;
    });
    this.translate.get("UNIVERSE.POPULATION.PEOPLE" + this.race + ".INCONVENIENTS").subscribe((res: string) => {
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
      pouvoir: 1,
    };
    this.mainSkills = {
      art: { value: 0, spe: "" },
      athletisme: { value: 0, spe: "" },
      combat: { value: 0, spe: "" },
      furtivite: { value: 0, spe: "" },
      medecine: { value: 0, spe: "" },
      perception: { value: 0, spe: "" },
      savoir: { value: 0, spe: "" },
      social: { value: 0, spe: "" },
    };

    this.nbPointsCaracteristics = 13;
    this.nbPointsMainSkills = 15;
    this.nbPointsCrystals = 10;

    this.health01 = 2;
    this.health02 = 2;
    this.health03 = 2;
    this.health04 = 1;

    this.crystals = [
      { level: 0, time: 0, target: 0 },
      { level: 0, time: 0, target: 0 },
      { level: 0, time: 0, target: 0 },
    ];

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

    this.translate.get("UNIVERSE.POPULATION.PEOPLE" + this.race + ".AVANTAGES").subscribe((res: string) => {
      this.avantages = res;
    });
    this.translate.get("UNIVERSE.POPULATION.PEOPLE" + this.race + ".INCONVENIENTS").subscribe((res: string) => {
      this.inconvenients = res;
    });

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
    this.leftPointsCaracteristics = this.nbPointsCaracteristics - totalCaracteristics;

    var totalMainSkills = 0;
    for (var key in this.mainSkills) {
      totalMainSkills += this.mainSkills[key].value;
      if (this.mainSkills[key].spe) totalMainSkills += 2;
    }
    this.leftPointsMainSkills = this.nbPointsMainSkills - totalMainSkills;

    var totalCrystals = 0;
    for (var key in this.crystals) {
      totalCrystals += this.crystals[key].level;
      if (this.crystals[key].time) totalCrystals += this.crystals[key].time;
      if (this.crystals[key].target) totalCrystals += this.crystals[key].target;
    }
    this.leftPointsCrystals = this.nbPointsCrystals - totalCrystals;

    this.initiative = this.caracteristics.habilete + this.caracteristics.intellect;
    if (this.caracteristics.vigueur === 1) {
      this.health01 = 1;
    } else if (this.caracteristics.vigueur === 5) {
      this.health01 = 3;
    } else {
      this.health01 = 2;
    }
    if (this.race === 2 || this.race === 5) {
      this.health03 = 1;
    } else if (this.race === 3 || this.race === 6) {
      this.health03 = 3;
    } else {
      this.health03 = 2;
    }

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

  ///////////////////////////////////////////////////////////////////////////////////////////////////////
  /////////////                           PART IV : CRYSTALS                             ////////////////
  ///////////////////////////////////////////////////////////////////////////////////////////////////////

  changeCrystalName(number, event) {
    this.crystals[number].name = event.value;
    this.refreshPoints();
  }

  changeCrystalType(number, event) {
    this.crystals[number].type = event.value;
    this.refreshPoints();
  }

  changeCrystalLevel(number, event) {
    this.crystals[number].level = parseInt(event.value);
    this.refreshPoints();
  }

  changeCrystalTarget(number, event) {
    this.crystals[number].target = parseInt(event.value);
    this.refreshPoints();
  }

  changeCrystalTime(number, event) {
    this.crystals[number].time = parseInt(event.value);
    this.refreshPoints();
  }

  ///////////////////////////////////////////////////////////////////////////////////////////////////////
  /////////////                           PART V : EQUIPMENT                             ////////////////
  ///////////////////////////////////////////////////////////////////////////////////////////////////////

  changeArmor(event) {
    this.armor = LIST_ARMORS[0];
    LIST_ARMORS.forEach((element) => {
      if (element.id === parseInt(event.value)) this.armor = element;
    });
    this.checkWarnings();
  }

  changeWeapon01(event) {
    this.weapon01 = {};
    LIST_WEAPONS.forEach((element) => {
      if (element.id === parseInt(event.value)) this.weapon01 = element;
    });
    this.checkWarnings();
  }

  changeWeapon02(event) {
    this.weapon02 = {};
    LIST_WEAPONS.forEach((element) => {
      if (element.id === parseInt(event.value)) this.weapon02 = element;
    });
    this.checkWarnings();
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
      const promiseGetImage64 = new Promise(function (resolve, reject) {
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

    if (this.leftPointsMainSkills > 0) {
      infos += "Il reste des points de compétences à dépenser.<br>";
    }
    if (this.leftPointsMainSkills < 0) {
      infos += "Vous avez dépensé trop de points de compétences (votre personnage a déjà obtenu de l'eXPérience ?).<br>";
    }

    if (this.leftPointsCrystals > 0) {
      infos += "Il reste des points de cristaux à dépenser.<br>";
    }
    if (this.leftPointsCrystals < 0) {
      infos += "Vous avez dépensé trop de points de cristaux (votre personnage a déjà obtenu de l'eXPérience ?).<br>";
    }

    if (!this.crystals[0].name && !this.crystals[1].name && !this.crystals[2].name) {
      infos += "Votre personnage n'a pas de cristal. (Est-ce voulu ?)<br>";
    }

    if (
      this.crystals[0].name &&
      (!this.crystals[0].type ||
        !this.crystals[0].level ||
        (!this.crystals[0].time && this.crystals[0].time !== 0) ||
        (!this.crystals[0].target && this.crystals[0].target !== 0))
    ) {
      infos += "Votre premier cristal est incomplet.<br>";
    }

    if (
      this.crystals[1].name &&
      (!this.crystals[1].type ||
        !this.crystals[1].level ||
        (!this.crystals[1].time && this.crystals[1].time !== 0) ||
        (!this.crystals[1].target && this.crystals[1].target !== 0))
    ) {
      infos += "Votre deuxième cristal est incomplet.<br>";
    }

    if (
      this.crystals[2].name &&
      (!this.crystals[2].type ||
        !this.crystals[2].level ||
        (!this.crystals[2].time && this.crystals[2].time !== 0) ||
        (!this.crystals[2].target && this.crystals[2].target !== 0))
    ) {
      infos += "Votre troisième cristal est incomplet.<br>";
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
    if (this.warning) {
      this.listWarnings = "<b>Vous avez des éléments manquants ou des incohérences dans votre fiche :</b><br><br>" + infos;
    } else {
      this.listWarnings = "";
    }
  }

  loadJSON(event) {
    var file = event.files[0];
    if (!file) return;
    if (file.size > 2000000) {
      alert("Warning (Max size : 2 Mo)");
    } else {
      var parameters;
      const promiseGetParameters = new Promise(function (resolve, reject) {
        var reader = new FileReader();
        reader.readAsText(file);
        reader.onload = function () {
          parameters = JSON.parse(reader.result.toString());
          return resolve(true);
        };
        reader.onerror = function (error) {
          console.log(error);
        };
      });
      Promise.all([promiseGetParameters]).then(() => {
        this.caracteristics = parameters.caracteristics;
        this.changeRace({ value: parameters.race });
        for (var key in this.mainSkills) {
          let value = parameters.mainSkills[key];
          if (value) {
            this.mainSkills[key] = value;
            if (!parameters.version || parameters.version !== "2.1") this.mainSkills[key].spe = "";
          }
        }
        if (parameters.crystal01) this.crystals[0].name = parameters.crystal01.name;
        if (parameters.crystal02) this.crystals[1].name = parameters.crystal02.name;
        if (parameters.crystal03) this.crystals[2].name = parameters.crystal03.name;
        if (parameters.crystals) {
          parameters.crystals.forEach((crystal, index) => {
            this.crystals[index] = crystal;
            // Obligé car les selects ne se rechargent pas
            this.crystals[index].type = null;
          });
        }
        this.armor = LIST_ARMORS.find((armor) => armor.id === parameters.armor.id);
        this.weapon01 = LIST_WEAPONS.find((weapon) => weapon.id === parameters.weapon01.id);
        this.weapon02 = LIST_WEAPONS.find((weapon) => weapon.id === parameters.weapon02.id);
        if (!this.armor) this.armor = {};
        if (!this.weapon01) this.weapon01 = {};
        if (!this.weapon02) this.weapon02 = {};
        this.name = parameters.name;
        this.description = parameters.description;
        this.avatar = parameters.avatar;
        this.refreshPoints();
        this.checkWarnings();
        alert("Importation du personnage réussie !");
      });
    }
  }

  downloadJSON() {
    var parameters = {
      race: this.race,
      caracteristics: this.caracteristics,
      mainSkills: this.mainSkills,
      crystals: this.crystals,
      armor: this.armor,
      weapon01: this.weapon01,
      weapon02: this.weapon02,
      name: this.name,
      description: this.description,
      avatar: this.avatar,
      version: "2.1",
    };
    var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(parameters));
    var dlAnchorElem = document.getElementById("creation-save-json");
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
      xhr.onload = function () {
        var reader = new FileReader();
        reader.onloadend = function () {
          callback(reader.result);
        };
        reader.readAsDataURL(xhr.response);
      };
      xhr.open("GET", url);
      xhr.responseType = "blob";
      xhr.send();
    }

    const promise = new Promise(function (resolve, reject) {
      toDataURL("./assets/files/Fiche_PersoVide.jpg", function (dataUrl) {
        doc.addImage(dataUrl, "JPEG", 0, 0, width, height);
        doc.setFontSize(10);
        return resolve(true);
      });
    });

    Promise.all([promise]).then(() => {
      // --- AVATAR ET DESCRIPTION
      if (this.avatar) doc.addImage(this.avatar, "JPEG", 9.5, 10.5, 95.5, 82.25);
      doc.setFontSize(8);
      doc.text("" + this.description, 176, 54, {
        align: "justify",
        maxWidth: 190,
      });
      doc.setFontSize(10);

      // --- IDENTITE
      doc.text("" + this.name, 112, 132.9);
      LIST_RACES.forEach((element) => {
        if (this.race === element.id) {
          doc.text(element.name, 112, 154.1);
        }
      });

      // --- CARACTERISTIQUES
      var i = 217.2;
      for (var key in this.caracteristics) {
        doc.text("" + this.caracteristics[key], 123, i, { align: "center" });
        i += 21.2;
      }

      // --- NIVEAU DE BLESSURES
      i = 353;
      doc.setFillColor(255, 255, 255);
      if (this.health01 < 2) doc.rect(135, i, 20, 20, "F");
      if (this.health01 < 3) doc.rect(168, i, 20, 20, "F");
      i += 21.2;
      if (this.health02 < 2) doc.rect(135, i, 20, 20, "F");
      if (this.health02 < 3) doc.rect(168, i, 20, 20, "F");
      i += 21.2;
      if (this.health03 < 2) doc.rect(135, i, 20, 20, "F");
      if (this.health03 < 3) doc.rect(168, i, 20, 20, "F");
      i += 21.2;
      if (this.health04 < 2) doc.rect(135, i, 20, 20, "F");
      if (this.health04 < 3) doc.rect(168, i, 20, 20, "F");

      // --- COMPTENCES PRINCIPALES
      i = 154.0;
      for (var key in this.mainSkills) {
        doc.text("" + this.mainSkills[key].value, 313.5, i, { align: "center" });
        doc.setFontSize(8);
        let res = this.mainSkills[key].spe.length > 18 ? this.mainSkills[key].spe.slice(0, 17) + "." : this.mainSkills[key].spe;
        doc.text("" + res, 388.5, i, { align: "center" });
        doc.setFontSize(10);
        i += 21.2;
      }

      // --- VALEURS DE COMBAT
      i = 376.2;
      doc.text("" + this.initiative, 313.5, i, { align: "center" });

      i = 407.6;
      if (this.armor.name) {
        let res = this.armor.name.indexOf(" (") > 0 ? this.armor.name.substring(0, this.armor.name.indexOf(" (")) : this.armor.name;
        doc.setFontSize(8);
        doc.text("" + res, 234, i);
        doc.setFontSize(10);
      }
      if (this.armor.attackBonus) doc.text("" + this.armor.attackBonus, 326, i, { align: "center" });
      if (this.armor.defenceBonus) doc.text("" + this.armor.defenceBonus, 371.5, i, { align: "center" });
      i += 10.6;
      if (this.weapon01.name) {
        let res = this.weapon01.name.indexOf(" (") > 0 ? this.weapon01.name.substring(0, this.weapon01.name.indexOf(" (")) : this.weapon01.name;
        doc.setFontSize(8);
        doc.text("" + res, 234, i);
        doc.setFontSize(10);
      }
      if (this.weapon01.attackBonus) doc.text("" + this.weapon01.attackBonus, 326, i, { align: "center" });
      if (this.weapon01.defenceBonus) doc.text("" + this.weapon01.defenceBonus, 371.5, i, { align: "center" });
      i += 10.6;
      if (this.weapon02.name) {
        let res = this.weapon02.name.indexOf(" (") > 0 ? this.weapon02.name.substring(0, this.weapon02.name.indexOf(" (")) : this.weapon02.name;
        doc.setFontSize(8);
        doc.text("" + res, 234, i);
        doc.setFontSize(10);
      }
      if (this.weapon02.attackBonus) doc.text("" + this.weapon02.attackBonus, 326, i, { align: "center" });
      if (this.weapon02.defenceBonus) doc.text("" + this.weapon02.defenceBonus, 371.5, i, { align: "center" });

      // --- CRISTAUX LIES
      i = 483;
      if (this.crystals[0].name && this.crystals[0].type) {
        doc.setFontSize(8);
        doc.text("" + this.crystals[0].name, 29, i);
        doc.text("" + this.convertTypeCrystal(this.crystals[0]), 145, i, { align: "center" });
        doc.setFontSize(10);
        doc.text("" + this.crystals[0].level, 201, i, { align: "center" });
        doc.setFontSize(8);
        doc.text("" + this.convertTimeCrystal(this.crystals[0]), 247, i, { align: "center" });
        doc.text("" + this.convertTargetCrystal(this.crystals[0]), 292, i, { align: "center" });
        doc.setFontSize(10);
      }
      i += 21.2;
      if (this.crystals[1].name && this.crystals[1].type) {
        doc.setFontSize(8);
        doc.text("" + this.crystals[1].name, 29, i);
        doc.text("" + this.convertTypeCrystal(this.crystals[1]), 145, i, { align: "center" });
        doc.setFontSize(10);
        doc.text("" + this.crystals[1].level, 201, i, { align: "center" });
        doc.setFontSize(8);
        doc.text("" + this.convertTimeCrystal(this.crystals[1]), 247, i, { align: "center" });
        doc.text("" + this.convertTargetCrystal(this.crystals[1]), 292, i, { align: "center" });
        doc.setFontSize(10);
      }
      i += 21.2;
      if (this.crystals[2].name && this.crystals[2].type) {
        doc.setFontSize(8);
        doc.text("" + this.crystals[2].name, 29, i);
        doc.text("" + this.convertTypeCrystal(this.crystals[2]), 145, i, { align: "center" });
        doc.setFontSize(10);
        doc.text("" + this.crystals[2].level, 201, i, { align: "center" });
        doc.setFontSize(8);
        doc.text("" + this.convertTimeCrystal(this.crystals[2]), 247, i, { align: "center" });
        doc.text("" + this.convertTargetCrystal(this.crystals[2]), 292, i, { align: "center" });
        doc.setFontSize(10);
      }
      doc.save("Arlenor_" + this.name + ".pdf");
    });
  }

  convertTypeCrystal(crystal) {
    var element = LIST_TYPE.find((type) => type.code === crystal.type);
    return element.title;
  }

  convertTimeCrystal(crystal) {
    var time;
    switch (crystal.time) {
      case 0:
        time = "Instant.";
        break;
      case 1:
        time = "Scène";
        break;
      case 3:
        time = "Journée";
        break;
      case 5:
        time = "Illimitée";
        break;
      default:
        time = "";
    }
    return time;
  }

  convertTargetCrystal(crystal) {
    var target;
    switch (crystal.target) {
      case 0:
        target = "Perso.";
        break;
      case 1:
        target = "Toucher";
        break;
      case 3:
        target = "A vue";
        break;
      case 5:
        target = "Infinie";
        break;
      default:
        target = "";
    }
    return target;
  }
}
