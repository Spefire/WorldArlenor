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
		"texte01": "Cette cité est située dans les Plaines de Terfil aux bords du fleuve Laloran. Elle est considérée comme l'une des plus grandes cités du Monde d'Arlénor. Sa construction se base sur le principe suivant :",
		"texte02": "- Le souterain : Faradel possède un souterain, habité par les habitants les plus pauvres, les clandestins, les mutants... toutes les personnes ne voulant pas être retrouvées. Un marché noir y est aussi très développé, et aucune milice n'ose s'y interposer.</p><p>- La partie basse : Faisant trois quarts de la surface de Faradel, elle contient la majorité des habitations. Comme c'est un vrai labyrinthe de constructions, de bâtiments, de petits magasins, il est très facile de s'y perdre.</p><p>- La partie haute : La bourgeoisie, et les marchands les plus riches y vivent. Il y a des grands jardins, ainsi qu'une place des fêtes. Une section de la partie haute est aussi réservée à l'aspect militaire de Faradel.",
		"comments": "La magie du Monde d'Arlénor provient des cristaux laissés par les Anges et les Démons lors de la Création..."
	},
  {
    "id": 1,
    "title": "La Tour du Savoir",
		"zone": "Faradel",
		"backgroundSrc": "assets/images/facts/tour.jpg",
    "comments": "Selon la légende connue par tous, la divinité de la Vie et de la Mort, Arlénor, a façonné le monde...",
		"texte01": "La magie du Monde d'Arlénor provient des cristaux laissés par les Anges et les Démons lors de la Création...",
		"texte02": "La magie du Monde d'Arlénor provient des cristaux laissés par les Anges et les Démons lors de la Création..."
  },
  {
    "id": 2,
    "title": "Le Commerce de Jirakan",
		"zone": "Jirakan",
		"backgroundSrc": "assets/images/facts/jirakan.jpg",
		"texte01": "La magie du Monde d'Arlénor provient des cristaux laissés par les Anges et les Démons lors de la Création...",
		"texte02": "La magie du Monde d'Arlénor provient des cristaux laissés par les Anges et les Démons lors de la Création...",
    "comments": "La magie du Monde d'Arlénor provient des cristaux laissés par les Anges et les Démons lors de la Création..."
  },
  {
    "id": 3,
    "title": "Le Grand Massacre",
		"zone": "Jirakan",
		"backgroundSrc": "assets/images/facts/massacre.jpg",
		"texte01": "La magie du Monde d'Arlénor provient des cristaux laissés par les Anges et les Démons lors de la Création...",
		"texte02": "La magie du Monde d'Arlénor provient des cristaux laissés par les Anges et les Démons lors de la Création...",
    "comments": "La magie du Monde d'Arlénor provient des cristaux laissés par les Anges et les Démons lors de la Création..."
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
