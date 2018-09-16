export class Article {

  public name?: string;

  constructor(jsonStr: string) {
    let jsonObj: any = JSON.parse(jsonStr);
    for (let prop in jsonObj) {
      this[prop] = jsonObj[prop];
    }
  }
}

export const articles = [
  {
    "title": "La Création",
    "type": "Religion",
    "description": "Selon la légende connue par tous, la divinité de la Vie et de la Mort, Arlénor, a façonné le monde..."
  },
  {
    "title": "La Magie des cristaux",
    "type": "Technologie",
    "description": "La magie du Monde d'Arlénor provient des cristaux laissés par les Anges et les Démons lors de la Création..."
  },
  {
    "title": "La Création",
    "type": "Religion",
    "description": "Selon la légende connue par tous, la divinité de la Vie et de la Mort, Arlénor, a façonné le monde..."
  },
  {
    "title": "La Magie des cristaux",
    "type": "Technologie",
    "description": "La magie du Monde d'Arlénor provient des cristaux laissés par les Anges et les Démons lors de la Création..."
  },
  {
    "title": "La Création",
    "type": "Religion",
    "description": "Selon la légende connue par tous, la divinité de la Vie et de la Mort, Arlénor, a façonné le monde..."
  },
  {
    "title": "La Magie des cristaux",
    "type": "Technologie",
    "description": "La magie du Monde d'Arlénor provient des cristaux laissés par les Anges et les Démons lors de la Création..."
  },
  {
    "title": "La Création",
    "type": "Religion",
    "description": "Selon la légende connue par tous, la divinité de la Vie et de la Mort, Arlénor, a façonné le monde..."
  },
  {
    "title": "La Magie des cristaux",
    "type": "Technologie",
    "description": "La magie du Monde d'Arlénor provient des cristaux laissés par les Anges et les Démons lors de la Création..."
  }
]