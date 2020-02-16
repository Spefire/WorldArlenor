export const LIST_RACES = [
  {
    id: 1,
    name: "Humain"
  },
  {
    id: 2,
    name: "Elfe"
  },
  {
    id: 3,
    name: "Nain"
  },
  {
    id: 4,
    name: "Mutant"
  },
  {
    id: 5,
    name: "Pan"
  },
  {
    id: 6,
    name: "Arlénien"
  }
];

export const LIST_ARMORS = [
  {
    id: 1,
    name: "Vêtements renforcés",
    defenceBonus: 2
  },
  {
    id: 2,
    name: "Armure lègère (cuir, cottes de mailles)",
    defenceBonus: 3
  },
  {
    id: 3,
    name: "Armure lourde (cuirasse, armure complète)",
    defenceBonus: 4
  }
];

export const LIST_WEAPONS = [
  {
    id: 1,
    name: "Lame courte (dague)",
    attackBonus: 1,
    defenceBonus: 1
  },
  {
    id: 2,
    name: "Arme à une main (épée longue, hache)",
    attackBonus: 2,
    defenceBonus: 0
  },
  {
    id: 3,
    name: "Arme à deux mains (espadon, grande hache)",
    attackBonus: 3,
    defenceBonus: -1
  },
  {
    id: 4,
    name: "Arme d'hast (lance, hallebarde)",
    attackBonus: 2,
    defenceBonus: 1
  },
  {
    id: 5,
    name: "Arme contondante (matraque, bâton)",
    attackBonus: 1,
    defenceBonus: 1
  },
  {
    id: 6,
    name: "Arc",
    attackBonus: 2
  },
  {
    id: 7,
    name: "Arbalète",
    attackBonus: 3
  },
  {
    id: 8,
    name: "Fronde",
    attackBonus: 0
  },
  {
    id: 9,
    name: "Armes de lancer (couteaux)",
    attackBonus: 2
  },
  {
    id: 10,
    name: "Armes à feu lègere (pistolet)",
    attackBonus: 3
  },
  {
    id: 11,
    name: "Armes à feu lourde (fusil)",
    attackBonus: 4
  },
  {
    id: 12,
    name: "Bouclier",
    defenceBonus: 2
  }
];

export const LIST_CRYSTALS = [
  {
    id: 1,
    rank: "S",
    rarity: "Unique",
    power: "Extrême",
    levelmax: 10
  },
  {
    id: 2,
    rank: "A",
    rarity: "Rare",
    power: "Forte",
    levelmax: 6
  },
  {
    id: 3,
    rank: "B",
    rarity: "Commune",
    power: "Faible",
    levelmax: 2
  },
  {
    id: 4,
    rank: "O",
    rarity: "Très commune",
    power: "Nulle",
    levelmax: 1
  }
];

export const LIST_TYPE = [
  {
    id: 1,
    code: "ABJ",
    title: "Abjuration",
    description: "Annulation et contre-sorts"
  },
  {
    id: 2,
    code: "CONV",
    title: "Convocation",
    description: "Appel à une entité"
  },
  {
    id: 3,
    code: "DIV",
    title: "Divination",
    description: "Révélation des choses cachées / secrètes"
  },
  {
    id: 4,
    code: "ENCH",
    title: "Enchantement",
    description: "Sort de renforcement / malédiction d'une entité"
  },
  {
    id: 5,
    code: "EVOC",
    title: "Evocation",
    description: "Créer / Détruire à partir de rien"
  },
  {
    id: 6,
    code: "ENV",
    title: "Envoûtement",
    description: "Contrôle d'une entité"
  },
  {
    id: 7,
    code: "ILL",
    title: "Illusion",
    description: "Manipulation des 5 sens par l'environnement"
  },
  {
    id: 8,
    code: "TRANS",
    title: "Transmutation",
    description: "Transformation physique complète ou partielle d'une entité"
  }
];
