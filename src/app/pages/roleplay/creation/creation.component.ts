import { Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";
import jsPDF from "jspdf";

import { ArlenorCharacter } from "src/app/models/character.model";
import { ArlenorObj, ListArmors, ListRaces, ListWeapons, ListTypesCrystals, ListCaracts, ListSkills } from "src/app/models/creation.model";
import { RoutesService } from "src/app/services/routes.service";

@Component({
  selector: "app-creation",
  templateUrl: "./creation.component.html",
  styleUrls: ["./creation.component.scss"],
  providers: [RoutesService],
})
export class CreationComponent {

  public perso: ArlenorCharacter;

  public avantages: string;
  public inconvenients: string;

  public nbPointsCaracteristics: number;
  public leftPointsCaracteristics: number;
  public nbPointsSkills: number;
  public leftPointsSkills: number;
  public nbPointsCrystals: number;
  public leftPointsCrystals: number;

  public warning: boolean;
  public listWarnings: string;

  public listRaces: ArlenorObj[] = ListRaces;
  public listCaracts: ArlenorObj[] = ListCaracts;
  public listSkills: ArlenorObj[] = ListSkills;
  public listTypes: ArlenorObj[] = ListTypesCrystals;
  public listArmors: ArlenorObj[] = ListArmors;
  public listWeapons: ArlenorObj[] = ListWeapons;

  public help: ArlenorObj;

  constructor(private routesService: RoutesService, private route: ActivatedRoute, private translate: TranslateService) {
    this.routesService.setTitleMetas("CREATION");
    this.translate.get("UNIVERSE.POPULATION.PEOPLE1.AVANTAGES").subscribe((res: string) => {
      this.avantages = res;
    });
    this.translate.get("UNIVERSE.POPULATION.PEOPLE1.INCONVENIENTS").subscribe((res: string) => {
      this.inconvenients = res;
    });
    this.initValues();
    this.refreshPoints();
    this.closePopup();
  }

  initValues() {
    this.perso = new ArlenorCharacter();

    this.nbPointsCaracteristics = 14;
    this.nbPointsSkills = 15;
    this.nbPointsCrystals = 4;
  }

  openPopup(event: any) {
    if (event) this.help = event.value;
  }

  closePopup() {
    this.help = null;
  }

  ///////////////////////////////////////////////////////////////////////////////////////////////////////
  /////////////                           PART I : RACE                                  ////////////////
  ///////////////////////////////////////////////////////////////////////////////////////////////////////

  changeRace(event) {
    this.perso.race = parseInt(event.value);

    this.translate.get("UNIVERSE.POPULATION.PEOPLE" + event.value + ".AVANTAGES").subscribe((res: string) => {
      this.avantages = res;
    });
    this.translate.get("UNIVERSE.POPULATION.PEOPLE" + event.value + ".INCONVENIENTS").subscribe((res: string) => {
      this.inconvenients = res;
    });

    this.refreshPoints();
  }

  ///////////////////////////////////////////////////////////////////////////////////////////////////////
  /////////////                           PART II : CARACTERISTICS                       ////////////////
  ///////////////////////////////////////////////////////////////////////////////////////////////////////

  changeCaract(event) {
    this.perso.caracts[event.code].value = parseInt(event.value);
    this.refreshPoints();
  }

  refreshPoints() {
    this.leftPointsCaracteristics = this.nbPointsCaracteristics - this.perso.caracts.totalCaracts;
    this.leftPointsSkills = this.nbPointsSkills - this.perso.skills.totalSkills;
    this.leftPointsCrystals = this.nbPointsCrystals - this.perso.totalCrystals;

    this.checkWarnings();
  }

  ///////////////////////////////////////////////////////////////////////////////////////////////////////
  /////////////                           PART III : SKILLS                              ////////////////
  ///////////////////////////////////////////////////////////////////////////////////////////////////////

  changeValueSkill(event) {
    this.perso.skills[event.code].value = parseInt(event.value);
    this.refreshPoints();
  }

  changeSpeSkill(event) {
    this.perso.skills[event.code].spe = event.spe;
    this.refreshPoints();
  }

  ///////////////////////////////////////////////////////////////////////////////////////////////////////
  /////////////                           PART IV : CRYSTALS                             ////////////////
  ///////////////////////////////////////////////////////////////////////////////////////////////////////

  changeCrystalName(number, event) {
    this.perso.crystals[number].name = event.value;
    this.refreshPoints();
  }

  changeCrystalType(number, event) {
    this.perso.crystals[number].type = event.value;
    this.refreshPoints();
  }

  changeCrystalLevel(number, event) {
    if (!event.value) event.value = 1;
    this.perso.crystals[number].level = parseInt(event.value);
    this.refreshPoints();
  }

  ///////////////////////////////////////////////////////////////////////////////////////////////////////
  /////////////                           PART V : EQUIPMENT                             ////////////////
  ///////////////////////////////////////////////////////////////////////////////////////////////////////

  changeArmor(event) {
    this.perso.armor = null;
    this.listArmors.forEach((element) => {
      if (element.id === parseInt(event.value)) this.perso.armor = element;
    });
    this.checkWarnings();
  }

  changeWeapon01(event) {
    this.perso.weapon01 = null;
    this.listWeapons.forEach((element) => {
      if (element.id === parseInt(event.value)) this.perso.weapon01 = element;
    });
    this.checkWarnings();
  }

  changeWeapon02(event) {
    this.perso.weapon02 = null;
    this.listWeapons.forEach((element) => {
      if (element.id === parseInt(event.value)) this.perso.weapon02 = element;
    });
    this.checkWarnings();
  }

  ///////////////////////////////////////////////////////////////////////////////////////////////////////
  /////////////                           PART VI : IDENTITY                             ////////////////
  ///////////////////////////////////////////////////////////////////////////////////////////////////////

  changeName(event) {
    this.perso.name = event.value;
    this.checkWarnings();
  }

  changeDescription(event) {
    this.perso.description = event.value;
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
        this.perso.avatar = image64;
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
      infos += "Vous avez dépensé trop de points de caractéristiques (Votre personnage a augmenté de niveau ?).<br>";
    }

    if (this.leftPointsSkills > 0) {
      infos += "Il reste des points de compétences à dépenser.<br>";
    }
    if (this.leftPointsSkills < 0) {
      infos += "Vous avez dépensé trop de points de compétences (Votre personnage a augmenté de niveau ?).<br>";
    }

    if (this.leftPointsCrystals > 0) {
      infos += "Il reste des points de cristaux à dépenser.<br>";
    }
    if (this.leftPointsCrystals < 0) {
      infos += "Vous avez dépensé trop de points de cristaux (Votre personnage a augmenté de niveau ?).<br>";
    }

    if (!this.perso.crystals[0].name && !this.perso.crystals[1].name && !this.perso.crystals[2].name) {
      infos += "Votre personnage n'a pas de cristal. (Est-ce voulu ?)<br>";
    }

    if (this.perso.crystals[0].name && !this.perso.crystals[0].type) {
      infos += "Votre premier cristal est incomplet.<br>";
    }

    if (this.perso.crystals[1].name && !this.perso.crystals[1].type) {
      infos += "Votre deuxième cristal est incomplet.<br>";
    }

    if (this.perso.crystals[2].name && !this.perso.crystals[2].type) {
      infos += "Votre troisième cristal est incomplet.<br>";
    }

    if (!this.perso.armor && !this.perso.weapon01 && !this.perso.weapon02) {
      infos += "Votre personnage n'a pas d'équipement. (Est-ce voulu ?).<br>";
    }

    if (this.perso.name.length <= 0) {
      infos += "Votre personnage n'a pas de nom.<br>";
    }
    if (this.perso.description.length <= 0) {
      infos += "Votre personnage n'a pas de description.<br>";
    }
    if (this.perso.avatar.length <= 0) {
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

      this.perso = new ArlenorCharacter();
      Promise.all([promiseGetParameters]).then(() => {
        if (parameters.version === "2.2") {

          // Import race
          this.changeRace({ value: parameters.race });
          // Import caracts
          this.perso.caracts.vig = parameters.caracts.vig;
          this.perso.caracts.hab = parameters.caracts.hab;
          this.perso.caracts.int = parameters.caracts.int;
          this.perso.caracts.cha = parameters.caracts.cha;
          this.perso.caracts.pou = parameters.caracts.pou;
          // Import skills
          this.perso.skills.art = parameters.skills.art;
          this.perso.skills.ath = parameters.skills.ath;
          this.perso.skills.com = parameters.skills.com;
          this.perso.skills.fur = parameters.skills.fur;
          this.perso.skills.med = parameters.skills.med;
          this.perso.skills.per = parameters.skills.per;
          this.perso.skills.sav = parameters.skills.sav;
          this.perso.skills.soc = parameters.skills.soc;
          // Import crystals
          this.perso.crystals = parameters.crystals;
          this.perso.crystals.forEach(crystal => {
            crystal.type = ""; // TODO : Le select n'est pas mis à jour, donc par défaut on vide le type
          });
          // Import stuff
          this.listArmors.forEach((armor) => {
            if (armor.id === parseInt(parameters.armor.id)) this.perso.armor = armor;
          });
          this.listWeapons.forEach((weapon) => {
            if (weapon.id === parseInt(parameters.weapon01.id)) this.perso.weapon01 = weapon;
            if (weapon.id === parseInt(parameters.weapon02.id)) this.perso.weapon02 = weapon;
          });
          // Import all
          this.perso.name = parameters.name;
          this.perso.description = parameters.description;
          this.perso.avatar = parameters.avatar;

        } else {

          // Import race
          this.changeRace({ value: parameters.race });
          // Import caracts
          if (parameters.caracteristics) {
            this.perso.caracts.vig.value = parameters.caracteristics.vigueur;
            this.perso.caracts.hab.value = parameters.caracteristics.habilete;
            this.perso.caracts.int.value = parameters.caracteristics.intellect;
            this.perso.caracts.cha.value = parameters.caracteristics.charisme;
            this.perso.caracts.pou.value = 5;
          }
          // Import skills
          if (parameters.mainSkills) {
            this.perso.skills.art.value = parameters.mainSkills.art.value;
            this.perso.skills.ath.value = parameters.mainSkills.athletisme.value;
            this.perso.skills.com.value = parameters.mainSkills.combat.value;
            this.perso.skills.fur.value = parameters.mainSkills.furtivite.value;
            this.perso.skills.med.value = parameters.mainSkills.medecine.value;
            this.perso.skills.per.value = parameters.mainSkills.perception.value;
            this.perso.skills.sav.value = parameters.mainSkills.savoir.value;
            this.perso.skills.soc.value = parameters.mainSkills.social.value;
          }
          // Import crystals
          if (parameters.crystal01 && parameters.crystal01.name) {
            this.perso.crystals[0].name = parameters.crystal01.name;
          }
          if (parameters.crystal02 && parameters.crystal02.name) {
            this.perso.crystals[1].name = parameters.crystal02.name;
          }
          if (parameters.crystal03 && parameters.crystal03.name) {
            this.perso.crystals[2].name = parameters.crystal03.name;
          }
          if (parameters.crystals[0] && parameters.crystals[0].name) {
            this.perso.crystals[0].name = parameters.crystals[0].name;
          }
          if (parameters.crystals[1] && parameters.crystals[1].name) {
            this.perso.crystals[1].name = parameters.crystals[1].name;
          }
          if (parameters.crystals[2] && parameters.crystals[2].name) {
            this.perso.crystals[2].name = parameters.crystals[2].name;
          }
          // Import stuff
          this.listArmors.forEach((armor) => {
            if (armor.id === parseInt(parameters.armor.id)) this.perso.armor = armor;
          });
          this.listWeapons.forEach((weapon) => {
            if (weapon.id === parseInt(parameters.weapon01.id)) this.perso.weapon01 = weapon;
            if (weapon.id === parseInt(parameters.weapon02.id)) this.perso.weapon02 = weapon;
          });
          // Import all
          this.perso.name = parameters.name;
          this.perso.description = parameters.description;
          this.perso.avatar = parameters.avatar;

        }
        this.refreshPoints();
        this.checkWarnings();
        alert("Importation partielle du personnage réussie.");
      });
    }
  }

  downloadJSON() {
    var parameters = {
      version: "2.2",
      name: this.perso.name,
      race: this.perso.race,
      caracts: this.perso.caracts,
      skills: this.perso.skills,
      crystals: this.perso.crystals,
      armor: this.perso.armor,
      weapon01: this.perso.weapon01,
      weapon02: this.perso.weapon02,
      description: this.perso.description,
      avatar: this.perso.avatar,
    };
    var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(parameters));
    var dlAnchorElem = document.getElementById("creation-save-json");
    dlAnchorElem.setAttribute("href", dataStr);
    dlAnchorElem.setAttribute("download", "Arlenor_Save_" + this.perso.name + ".json");
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
      if (this.perso.avatar) doc.addImage(this.perso.avatar, "JPEG", 9.5, 10.5, 95.5, 82.25);
      doc.setFontSize(8);
      doc.text("" + this.perso.description, 176, 54, {
        align: "justify",
        maxWidth: 190,
      });
      doc.setFontSize(10);

      // --- IDENTITE
      doc.text("" + this.perso.name, 112, 132.9);
      this.listRaces.forEach((element) => {
        if (this.perso.race === element.id) {
          doc.text(element.name, 112, 154.1);
        }
      });

      // --- CARACTERISTIQUES
      var i = 217.2;
      for (var key in this.perso.caracts) {
        doc.text("" + this.perso.caracts[key].value, 123, i, { align: "center" });
        i += 21.2;
      }

      // --- NIVEAU DE BLESSURES
      i = 353;
      doc.setFillColor(255, 255, 255);
      if (this.perso.health01 < 2) doc.rect(135, i, 20, 20, "F");
      if (this.perso.health01 < 3) doc.rect(168, i, 20, 20, "F");
      i += 21.2;
      if (this.perso.health02 < 2) doc.rect(135, i, 20, 20, "F");
      if (this.perso.health02 < 3) doc.rect(168, i, 20, 20, "F");
      i += 21.2;
      if (this.perso.health03 < 2) doc.rect(135, i, 20, 20, "F");
      if (this.perso.health03 < 3) doc.rect(168, i, 20, 20, "F");
      i += 21.2;
      if (this.perso.health04 < 2) doc.rect(135, i, 20, 20, "F");
      if (this.perso.health04 < 3) doc.rect(168, i, 20, 20, "F");

      // --- COMPTENCES PRINCIPALES
      i = 154.0;
      for (var key in this.perso.skills) {
        doc.text("" + this.perso.skills[key].value, 313.5, i, { align: "center" });
        doc.setFontSize(8);
        let res = this.perso.skills[key].spe.length > 18 ? this.perso.skills[key].spe.slice(0, 17) + "." : this.perso.skills[key].spe;
        doc.text("" + res, 388.5, i, { align: "center" });
        doc.setFontSize(10);
        i += 21.2;
      }

      // --- VALEURS DE COMBAT
      i = 376.2;
      doc.text("" + this.perso.initiative, 313.5, i, { align: "center" });

      i = 407.6;
      if (this.perso.armor) {
        let res = this.perso.armor.name.indexOf(" (") > 0 ?
          this.perso.armor.name.substring(0, this.perso.armor.name.indexOf(" (")) : this.perso.armor.name;
        doc.setFontSize(8);
        doc.text("" + res, 234, i);
        doc.setFontSize(10);
      }
      i += 10.6;
      if (this.perso.weapon01) {
        let res = this.perso.weapon01.name.indexOf(" (") > 0 ?
          this.perso.weapon01.name.substring(0, this.perso.weapon01.name.indexOf(" (")) : this.perso.weapon01.name;
        doc.setFontSize(8);
        doc.text("" + res, 234, i);
        doc.setFontSize(10);
      }
      i += 10.6;
      if (this.perso.weapon02) {
        let res = this.perso.weapon02.name.indexOf(" (") > 0 ?
          this.perso.weapon02.name.substring(0, this.perso.weapon02.name.indexOf(" (")) : this.perso.weapon02.name;
        doc.setFontSize(8);
        doc.text("" + res, 234, i);
        doc.setFontSize(10);
      }

      // --- CRISTAUX LIES
      i = 483;
      if (this.perso.crystals[0].name && this.perso.crystals[0].type) {
        doc.setFontSize(8);
        doc.text("" + this.perso.crystals[0].name, 29, i);
        doc.text("" + this.convertTypeCrystal(this.perso.crystals[0]), 145, i, { align: "center" });
        doc.setFontSize(10);
        doc.text("" + this.perso.crystals[0].level, 201, i, { align: "center" });
      }
      i += 21.2;
      if (this.perso.crystals[1].name && this.perso.crystals[1].type) {
        doc.setFontSize(8);
        doc.text("" + this.perso.crystals[1].name, 29, i);
        doc.text("" + this.convertTypeCrystal(this.perso.crystals[1]), 145, i, { align: "center" });
        doc.setFontSize(10);
        doc.text("" + this.perso.crystals[1].level, 201, i, { align: "center" });
      }
      i += 21.2;
      if (this.perso.crystals[2].name && this.perso.crystals[2].type) {
        doc.setFontSize(8);
        doc.text("" + this.perso.crystals[2].name, 29, i);
        doc.text("" + this.convertTypeCrystal(this.perso.crystals[2]), 145, i, { align: "center" });
        doc.setFontSize(10);
        doc.text("" + this.perso.crystals[2].level, 201, i, { align: "center" });
      }
      doc.save("Arlenor_" + this.perso.name + ".pdf");
    });
  }

  convertTypeCrystal(crystal) {
    var element = this.listTypes.find((type) => type.code === crystal.type);
    return element.name;
  }
}
