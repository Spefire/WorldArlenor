export class Fact {

  public id: number;
  public title?: string;
	public zone?: string;
	public backgroundSrc?:string;
	public texte01?:string;
	public texte02?:string;
	public comments?:string;

  constructor(jsonStr: string) {
    let jsonObj: any = JSON.parse(jsonStr);
    for (let prop in jsonObj) {
      this[prop] = jsonObj[prop];
    }
  }
}

export const facts = [
  {
    "id": 0,
		"title": "La Cité de Faradel",
		"zone": "Faradel",
		"backgroundSrc": "assets/images/facts/faradel.jpg",
		"texte01": "Située dans la zone paisible des Plaines de Terfil, Faradel fait partie des trois plus grandes cités du Monde d'Arlénor. Les elfes et les humains la considèrent comme la capitale du monde d'Arlénor, fortement développée militairement et technologiquement.</p><p>Sa construction se base sur le principe suivant :",
		"texte02": "- Le souterain : Faradel possède un souterain difficile d'accès, habité par les habitants les plus pauvres, les clandestins, les mutants... toutes les personnes ne voulant pas être retrouvées ou tuées. Un marché noir y est aussi très développé, et aucune milice n'ose s'y interposer.</p><p>- La partie basse : Faisant trois quarts de la surface de Faradel, elle contient la majorité des habitations et des temples d'Arlénor. Comme c'est un vrai labyrinthe de constructions, de bâtiments, de petits magasins, il est très facile de s'y perdre.</p><p>- La partie haute : La bourgeoisie, les 7 nobles familles de Faradel et les marchands les plus riches y vivent. Il y a des grands jardins, ainsi qu'une place des fêtes. De plus, une section de la partie haute est réservée à l'aspect militaire de Faradel et on y retrouve la Tour du Savoir en son centre.",
		"comments": "\"Dans notre monde, il y a ceux qui savent utiliser la magie, et ceux qui ne peuvent pas. Il y a les êtres civilisés, et il y a les bêtes...\"<br>- Humain faradélien, mettant son habit de garde"
	},
  {
    "id": 1,
    "title": "La Tour du Savoir",
		"zone": "Faradel",
		"backgroundSrc": "assets/images/facts/tour.jpg",
		"texte01": "La Tour du Savoir est l'emblème de l'Empire Faradélien. Situé en son centre, c'est aussi le centre des opérations économiques et politiques ainsi que le centre de recherche des meilleurs mages et artisans du monde.</p><p>La Tour du Savoir est découpée en plusieurs étages et sous-sols. Les sous-sols comportent principalement les laboratoires, les premiers étages comportent les salles d'opérations avec quelques appartements, et les derniers étages contiennent la plus grande Bibliothèque de mon d'Arlénor !",
		"texte02": "Au sommet de la Tour, il y a le cristal surnommé l'Eclat inifini : son nom est dû à la quantité d'énergie inépuisable qu'il fournit. Ce fut Xendel Eresles qui apporta ce cristal étrange et unique, dans la cité de Faradel.</p><p>Grâce à cette source d'énergie illimitée, les Faradeliens ont pu développer leur ville et leur technologie très rapidement : ce qui transforma complétement leur quotidien... Xendel Eresles est alors vu depuis, comme l'Esprit Veilleur de Faradel.",
		"comments": "\"Oui, l'Eclat infini a transformé notre cité et c'est fabuleux !<br>Comment fonctionne-t-il ? Euh... A coup de ta gueule c'est magique.\"<br>- Elfe faradélien, interrogé près de la Tour du Savoir"
  },
  {
    "id": 2,
    "title": "Le Commerce de Jirakan",
		"zone": "Jirakan",
		"backgroundSrc": "assets/images/facts/jirakan.jpg",
		"texte01": "Jirakan est la principale ville marchande du monde d'Arlénor. On y trouve en majorité des cristaux de tout genre, d'autres ressources minières, mais aussi de la location de main d'oeuvre voire même de la vente d'esclaves.</p><p>Ici les mutants et les nains sont tolérés, mais en tant qu'êtres dits 'inférieurs', ils servent d'esclaves aux maitres elfes / humains du monde entier...",
		"texte02": "Située dans la partie sud de Jirakan, la Minitation est gérée d'une organisation milimétrée : ce n'est pas une mine, mais la résidence de tous les esclaves, creusée dans la ville...</p><p>La Minitation est découpées en plusieurs niveaux représentant le rang social des esclaves : les familles 'aisées' sont plus proches de la surface que les moins 'aisées'. Les familles d'esclaves ont alors un maitre, appelé aussi Superviseur, qui va gérer leur temps de travail et influencer sur leur rang social.</p><p>La vie d'un Jirakanien esclave n'est alors pas facile, et se concentre autour de la Minitation et des mines aux alentours de Jirakan.",
    "comments": "\"Ici c'est la règle des trois M qui domine : Miner, Miner et Miner.<br>Il n'existe rien d'autre. On n'existe pas.\"<br>- Adolescent mutant partant aux mines"
  },
  {
    "id": 3,
    "title": "La Grande Révolte",
		"zone": "Jirakan",
		"backgroundSrc": "assets/images/facts/revolte.jpg",
		"texte01": "En l'An 666 du calendrier arlénien, un groupe d'esclaves et de partisans pour leur libération, ont monté une révolte contre les Superviseurs. Et, une nuit, ils sont passés à l'action en exterminant la majorité de leurs maitres.</p><p>Cependant, l'armée de Faradel est arrivée le lendemain pour soutenir les Superviseurs et les marchands de Jirakan... Pour contrer à cela, les esclaves se sont alors réfugiés dans les mines du Sud, près des montagnes de Kazador : les connaissant comme leur poche, ils en tiraient donc un grand avantage.",
		"texte02": "Au bout de quelques jours de batailles dans les mines, certains ont commencé à avoir des hallucinations, entendre des grognements et sentir de légères secousses... La folie a alors atteint les deux camps et beaucoup ont fuit le combat dans les mines.</p><p>Puis le jour fatal arriva. Un dernier grondement, audible par tous, a déclenché l'effrondrement de la mine alors qu'une bataille y faisait rage. Les peu de personnes ayant survécu, ont perdu toute magie et disaient qu'une entité les avait touchés.</p><p>Aujourd'hui, ces mines sont inaccessibles et définies comme étant maudites...",
    "comments": "\"C'était terrifiant. Le genre de moment où il n'y avait plus de camps : juste des personnes essayant de survivre... Quand nos cristaux n'ont plus fonctionné, on a su alors ce qu'était l'Impuissance.\"<br>- Survivant de la Grande Révolte"
  },
  {
    "id": 4,
    "title": "L'Ile de Lumeck",
		"zone": "Shivazen",
		"backgroundSrc": "assets/images/facts/lumeck.jpg",
		"texte01": "L'Ile de Lumeck est considérée comme une zone maudite : les marins qui s'aventurent dans la mer de Shivazen sont rares à survivre... mais ceux qui essayent de mettre un pied à terre sur cette île, n'en sont pas ressortis vivants. La faune et ainsi que la flore y sont des dangers permanents.",
		"texte02": "De plus, que ce soit les voies aériennes ou maritimes, la météo et les récifs empêchent toute procédure d'atterrissage ou d'amarrage impossible. Certains disent que l'île est vivante, avalant tout âme pour se nourrir...</p><p>Des cartographes ont quand même pu délimiter cette zone au bout de quelques années et aujourd'hui, seuls les fous continuent d'essayer de percer le mystère de l'île.",
    "comments": "\"Douloureux... Affreux... Puant... Effrayant...<br>La mort la plus belle ne se trouve pas en ces lieux.\"<br>- Cartographe, poète dans l'âme"
  }
]
