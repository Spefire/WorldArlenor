export class ArlenorCrystal {
  public name?: string;
  public type?: string;
  public level: number;

  constructor() {
    this.name = "";
    this.type = "";
    this.level = 1;
  }
}

export class ArlenorObj {
  public id?: number;
  public code?: string;
  public name: string;
  public description?: string;
  public notes?: string[];
  public specs?: string[];
}

export const ListRaces: ArlenorObj[] = [
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

export const ListCaracts: ArlenorObj[] = [
  {
    code: "vig",
    name: "Vigueur",
    description: "Mélange de résistance physique et de puissance brute, la <b>Vigueur</b> évalue la forme physique de votre personnage. Cette caractéristique est importante pour les personnages combattants, les sportifs et tous ceux qui aiment se sortir de situations dangereuses.",
    notes: [
      "Note : Une Vigueur à 1 donne 1 case de blessure à l'état « Indemne ».",
      "Note : Une Vigueur à 5 donne 3 cases de blessure à l'état « Indemne ».",
      "1 : Fragile. Force et endurance limitées, vous vous fatiguez vite.",
      "2 : Moyen. Vous n’avez de problèmes qu’avec des tours de force inhabituels.",
      "3 : Costaud. Vous fatiguez rarement et réalisez des tours de force.",
      "4 : Fort comme un bœuf. Peu de choses ou de personnes peuvent vous résister.",
      "5 : Herculéen. Vous résistez à tout et rivalisez de puissance avec les ours."
    ]
  },
  {
    code: "hab",
    name: "Habileté",
    description: "L’<b>Habileté</b> représente la capacité du personnage à s’acquitter de tâches de précision, sa finesse, sa dextérité, son talent pour viser ainsi que sa rapidité de réaction. C’est une aptitude inestimable pour les artisans, les voleurs, les danseurs et les tireurs de tout calibre.",
    notes: [
      "1 : Maladroit. Vous êtes un véritable éléphant dans un magasin de porcelaine.",
      "2 : Moyen. Au moins, vous ne provoquez que rarement des catastrophes.",
      "3 : Agile. Vous êtes doué de vos mains, et votre agilité vous sert dans bien des situations.",
      "4 : Félin. Vos réflexes et votre souplesse tiennent davantage de l’animal que de l’humain.",
      "5 : Gracieux. Vos mouvements sont tellement fluides qu’ils semblent irréels.",
    ]
  },
  {
    code: "int",
    name: "Intellect",
    description: "Les capacités intellectuelles de votre personnage, sa capacité à analyser, retenir les informations et les réutiliser en temps utile. L'<b>Intellect</b> est utile aux tacticiens, aux érudits, aux scientifiques et aux enquêteurs.",
    notes: [
      "1 : Simplet. Vous comprenez l’essentiel, mais toutes les subtilités vous échappent.",
      "2 : Moyen. Vous ne faites pas de miracles, mais vous vous en sortez honorablement.",
      "3 : Vif. Vous comprenez vite, analysez de manière pertinente et savez vous adapter.",
      "4 : Brillant. Vous comprenez rapidement ce que certains mettent des années à apprendre.",
      "5 : Génie. Vous maniez facilement des notions que la majorité des gens sont incapables d’appréhender.",
    ]
  },
  {
    code: "cha",
    name: "Charisme",
    description: "La capacité à s’imposer aux autres, à leur inspirer de la confiance, du respect ou de la crainte, ainsi qu’à les manipuler. Le <b>Charisme</b> comprend bien plus que la beauté physique, et est l’atout principal des dirigeants, des séducteurs et de tous les menteurs invétérés.",
    notes: [
      "1 : Fade. Vous n’inspirez pas les autres et semblez parfois transparent à leurs yeux.",
      "2 : Moyen. Vous vous faites des amis, comme tout le monde.",
      "3 : Intéressant. Vous ne laissez pas les gens indifférents, et beaucoup vous apprécient.",
      "4 : Captivant. Leader-né, votre personnalité attire les autres à vous.",
      "5 : Fascinant. Vous pourriez amener n’importe qui à faire n’importe quoi pour vous.",
    ]
  },
  {
    code: "pou",
    name: "Pouvoir",
    description: "Le <b>Pouvoir</b> est la caractéristique déterminant la capacité magique d'un être vivant. Les mages ont, de base, un excellent niveau dans cette caractéristique.",
    notes: [
      "1 : Non-mage. L'utilisation de ton énergie vitale est encore un mystère pour vous.",
      "5 : Mage. Les cristaux et leur magie vous sont totalement accessibles.",
    ]
  }
]

export const ListSkills: ArlenorObj[] = [
  {
    code: "art",
    name: "Art / Artisanat",
    description: "La capacité artistique pure et simple. Les grands peintres, les musiciens, les chanteurs, sculpteurs et comédiens ont tous en commun l’utilisation de cette compétence. Elle permet de gagner sa vie et de se faire apprécier de ceux que l’on rencontre. Cette compétence est aussi celle que partagent tous les bricoleurs, jusqu’aux grands maîtres artisans créant des pièces uniques. L’Artisanat permet aux personnages de créer seuls ce qu’ils ne trouvent pas ailleurs.",
    notes: [
      "- Créer une contrefaçon d’un document officiel (Hab. + Art / Artisanat, Test Complexe).",
      "- Expertiser un objet ancien redécouvert récemment (Int. + Art / Artisanat, Test Difficile).",
      "- Peindre un chef d’œuvre à la gloire de la princesse (Hab. + Art / Artisanat, Test Difficile)."
    ],
    specs: ["Archéologie", "Contrefaçon", "Crochetage", "Type d'art", "Type d'artisanat"]
  },
  {
    code: "ath",
    name: "Athlétisme",
    description: "Cette compétence regroupe les capacités sportives. Un personnage avec un haut niveau d’Athlétisme peut courir vite et longtemps, escalader des parois difficiles d’accès, nager sur de longues distances et tenir en équilibre sur un fil.",
    notes: [
      "- Courir après quelqu’un (Vig. + Athlétisme, Test en opposition entre les personnages).",
      "- Tenir en équilibre tout en avançant sur une corniche étroite (Hab. + Athlétisme, Test Complexe).",
      "- Nager au beau milieu d’une mer démontée (Vig. + Athlétisme, Test Epique)."
    ],
    specs: ["Course", "Équilibre", "Escalade", "Lancer", "Natation", "Saut"]
  },
  {
    code: "com",
    name: "Combat",
    description: "L’aptitude du personnage à manier les armes et à se défendre en situation d’affrontement physique. Cette compétence regroupe la maîtrise de tous les types d’armes ainsi que du combat à mains nues.",
    notes: [
      "- Voir les règles de combat.",
    ],
    specs: ["Armes à distance", "Armes à feu", "Armes à une main", "Armes à deux mains", "Mains nues", "Esquive", "Parade"]
  },
  {
    code: "fur",
    name: "Furtivité",
    description: "Cette compétence est celle des criminels, des espions et des enquêteurs. Elle permet de se cacher en toutes circonstances, qu’il s’agisse de se faire discret dans une forêt ou de paraître anonyme au milieu de la foule.",
    notes: [
      "- Le test d’Habileté + Furtivité du personnage est toujours un test en opposition avec un test d’Intellect + Perception de celui ou ceux qui auraient intérêt à le repérer. Si le personnage échoue à ce test, il est repéré.",
    ],
    specs: ["Anonymat", "Camouflage", "Filature", "Vol à la tire"]
  },
  {
    code: "med",
    name: "Médecine",
    description: "La médecine est la compétence qui permet au personnage de comprendre les causes des maladies, de soigner les blessures et de guérir une personne empoisonnée. Elle comprend la fabrication des médicaments et remèdes, mais également celle des poisons.",
    notes: [
      "- Diagnostiquer une maladie simple (Int. + Médecine, Test Simple).",
      "- Fabriquer un antidote à un poison courant (Int. + Médecine, Test Complexe).",
      "- Traiter une maladie inconnue et mortelle (Int. + Médecine, Test Epique)."
    ],
    specs: ["Apothicaire", "Chirurgie", "Diagnostic", "Poisons", "Maladies", "Secourisme"]
  },
  {
    code: "per",
    name: "Perception",
    description: "La Perception est la compétence qui permet au personnage de trouver des indices, d’établir des relations entre différents sens et de remarquer les détails de son environnement, ce qui comprend les personnes ou objets cachés. Elle permet aussi de discerner l’état émotionnel de ses interlocuteurs ou de comprendre quand on lui ment.",
    notes: [
      "- Trouver un indice sur une scène de crime (Int. + Perception, Test Simple).",
      "- Établir un lien entre plusieurs éléments (Int. + Perception, Test Complexe).",
      "- Repérer un détective en filature (Int. + Perception contre Hab. + Furtivité, Test en opposition)."
    ],
    specs: ["Audition", "Chercher objets", "Intuition", "Odorat", "Toucher"]
  },
  {
    code: "sav",
    name: "Savoir",
    description: "Cette compétence évalue l’érudition du personnage. Elle représente un savoir général dans tous les domaines, de l’histoire aux sciences de la vie, et celui qui la maîtrise à un haut niveau peut être considéré comme un véritable puits de science. De plus, celui qui maîtrise cette compétence peut identifier des sorts et connaît les créatures magiques.",
    notes: [
      "- Selon la rareté de l’information et sa précision, la Difficulté varie.",
    ],
    specs: ["Bibliothèque", "Cristologie", "Histoire et Théologie", "Langues et Littérature", "Pilotage", "Sciences de la nature", "Sciences technologiques"]
  },
  {
    code: "soc",
    name: "Social",
    description: "Capacité à convaincre les autres par la force de vos arguments, celle qui permet d’obtenir ce que l’on veut des autres, ou des informations sur tout un tas de sujets. Le Social est l’instrument préféré des diplomates, des vendeurs et de tous les professionnels de la négociation. Elle permet d’obtenir un prix sur un objet autant que de captiver les foules. Les experts dans ce domaine savent aussi délier les langues rapidement et dissimuler leurs véritables émotions ou objectifs aux yeux des autres.",
    notes: [
      "- Que ce soit pour faire avouer un secret à quelqu’un en le menaçant ou pour convaincre quelqu’un, le Social se joue par un test opposé (Cha. + Social contre Int. + Intuition).",
      "- Si plusieurs orateurs cherchent à se convaincre, un test opposé de Cha. + Social a lieu, et le plus haut score l’emporte."
    ],
    specs: ["Discours", "Interrogatoire", "Marchandage", "Mensonge", "Séduction"]
  },
]

export const ListTypesCrystals: ArlenorObj[] = [
  {
    code: "abj",
    name: "Abjuration",
    description: "Annulation et contre-sorts"
  },
  {
    code: "con",
    name: "Convocation",
    description: "Appel à une entité"
  },
  {
    code: "div",
    name: "Divination",
    description: "Révélation des choses cachées / secrètes"
  },
  {
    code: "enc",
    name: "Enchantement",
    description: "Sort de renforcement / malédiction d'une entité"
  },
  {
    code: "evo",
    name: "Evocation",
    description: "Créer / Détruire à partir de rien"
  },
  {
    code: "env",
    name: "Envoûtement",
    description: "Contrôle d'une entité"
  },
  {
    code: "ill",
    name: "Illusion",
    description: "Manipulation des sens par l'environnement"
  },
  {
    code: "tra",
    name: "Transmutation",
    description: "Transformation physique complète ou partielle d'une entité"
  }
];

export const ListArmors: ArlenorObj[] = [
  {
    id: 1,
    name: "Vêtements renforcés"
  },
  {
    id: 2,
    name: "Armure lègère (cuir, cottes de mailles)"
  },
  {
    id: 3,
    name: "Armure lourde (cuirasse, armure complète)"
  }
];

export const ListWeapons: ArlenorObj[] = [
  {
    id: 1,
    name: "Lame courte (dague)"
  },
  {
    id: 2,
    name: "Arme à une main (épée longue, hache)"
  },
  {
    id: 3,
    name: "Arme à deux mains (espadon, grande hache)"
  },
  {
    id: 4,
    name: "Arme d'hast (lance, hallebarde)"
  },
  {
    id: 5,
    name: "Arme contondante (matraque, bâton)"
  },
  {
    id: 6,
    name: "Arc"
  },
  {
    id: 7,
    name: "Arbalète"
  },
  {
    id: 8,
    name: "Fronde"
  },
  {
    id: 9,
    name: "Armes de lancer (couteaux)"
  },
  {
    id: 10,
    name: "Armes à feu lègere (pistolet)"
  },
  {
    id: 11,
    name: "Armes à feu lourde (fusil)"
  },
  {
    id: 12,
    name: "Bouclier"
  }
];
