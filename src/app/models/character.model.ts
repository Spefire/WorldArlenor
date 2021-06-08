class ArlenorCaracts {
  public vig: ArlenorValue;
  public hab: ArlenorValue;
  public int: ArlenorValue;
  public cha: ArlenorValue;
  public pou: ArlenorValue;

  get totalCaracts(): number {
    return this.vig.value
      + this.hab.value
      + this.int.value
      + this.cha.value
      + this.pou.value;
  }

  constructor() {
    this.vig = new ArlenorValue(1);
    this.hab = new ArlenorValue(1);
    this.int = new ArlenorValue(1);
    this.cha = new ArlenorValue(1);
    this.pou = new ArlenorValue(5);
  }
}

class ArlenorSkills {
  public art: ArlenorValue;
  public ath: ArlenorValue;
  public com: ArlenorValue;
  public fur: ArlenorValue;
  public med: ArlenorValue;
  public per: ArlenorValue;
  public sav: ArlenorValue;
  public soc: ArlenorValue;

  get totalSkills(): number {
    return this.art.value + (this.art.spe ? 2 : 0)
      + this.ath.value + (this.ath.spe ? 2 : 0)
      + this.com.value + (this.com.spe ? 2 : 0)
      + this.fur.value + (this.fur.spe ? 2 : 0)
      + this.med.value + (this.med.spe ? 2 : 0)
      + this.per.value + (this.per.spe ? 2 : 0)
      + this.sav.value + (this.sav.spe ? 2 : 0)
      + this.soc.value + (this.soc.spe ? 2 : 0);
  }

  constructor() {
    this.art = new ArlenorValue(0);
    this.ath = new ArlenorValue(0);
    this.com = new ArlenorValue(0);
    this.fur = new ArlenorValue(0);
    this.med = new ArlenorValue(0);
    this.per = new ArlenorValue(0);
    this.sav = new ArlenorValue(0);
    this.soc = new ArlenorValue(0);
  }
}

class ArlenorValue {
  public value: number;
  public spe?: string;

  constructor(value: number, spe: string = "") {
    this.value = value;
    this.spe = spe;
  }
}

export class ArlenorCharacter {
  public race: number;
  public caracts: ArlenorCaracts;
  public skills: ArlenorSkills;

  get initiative(): number {
    return this.caracts.hab.value + this.caracts.int.value;
  }

  get health01(): number {
    if (this.caracts.vig.value === 1) {
      return 1;
    } else if (this.caracts.vig.value === 5) {
      return 3;
    } else {
      return 2;
    }
  }

  get health02(): number {
    return 2;
  }

  get health03(): number {
    if (this.race === 2 || this.race === 5) {
      return 1;
    } else if (this.race === 3 || this.race === 6) {
      return 3;
    } else {
      return 2;
    }
  }

  get health04(): number {
    return 1;
  }

  constructor() {
    this.race = 1;
    this.caracts = new ArlenorCaracts();
    this.skills = new ArlenorSkills();
  }
}
