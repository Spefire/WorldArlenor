export class Fact {

  public id: number;
  public title?: string;
	public zone?: string;
	public logoSrc?:string;
	public backgroundSrc?:string;

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
		"logoSrc": "https://via.placeholder.com/200x200",
		"backgroundSrc": "https://via.placeholder.com/1000x400",
    "description": "La magie du Monde d'Arlénor provient des cristaux laissés par les Anges et les Démons lors de la Création..."
  },
  {
    "id": 1,
    "title": "La Tour du Savoir",
		"zone": "Faradel",
		"logoSrc": "https://via.placeholder.com/200x200",
		"backgroundSrc": "https://via.placeholder.com/1000x400",
    "description": "Selon la légende connue par tous, la divinité de la Vie et de la Mort, Arlénor, a façonné le monde..."
  },
  {
    "id": 2,
    "title": "Le Commerce de Jirakan",
		"zone": "Jirakan",
		"logoSrc": "https://via.placeholder.com/200x200",
		"backgroundSrc": "assets/images/facts/jirakan.jpg",
    "description": "La magie du Monde d'Arlénor provient des cristaux laissés par les Anges et les Démons lors de la Création..."
  },
  {
    "id": 3,
    "title": "Le Grand Massacre",
		"zone": "Jirakan",
		"logoSrc": "https://via.placeholder.com/200x200",
		"backgroundSrc": "assets/images/facts/massacre.jpg",
    "description": "Selon la légende connue par tous, la divinité de la Vie et de la Mort, Arlénor, a façonné le monde..."
  },
  {
    "id": 4,
    "title": "L'Ile de Lumeck",
		"zone": "Shivazen",
		"logoSrc": "https://via.placeholder.com/200x200",
		"backgroundSrc": "https://via.placeholder.com/1000x400",
    "description": "La magie du Monde d'Arlénor provient des cristaux laissés par les Anges et les Démons lors de la Création..."
	}
]
