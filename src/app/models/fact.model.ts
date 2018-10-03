export class Fact {

  public id: number;
  public title?: string;
  public zone?: string;

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
    "description": "La magie du Monde d'Arlénor provient des cristaux laissés par les Anges et les Démons lors de la Création..."
  },
  {
    "id": 1,
    "title": "La Tour du Savoir",
    "zone": "Faradel",
    "description": "Selon la légende connue par tous, la divinité de la Vie et de la Mort, Arlénor, a façonné le monde..."
  },
  {
    "id": 2,
    "title": "Le Commerce de Jirakan",
    "zone": "Jirakan",
    "description": "La magie du Monde d'Arlénor provient des cristaux laissés par les Anges et les Démons lors de la Création..."
  },
  {
    "id": 3,
    "title": "Le Grand Massacre",
    "zone": "Jirakan",
    "description": "Selon la légende connue par tous, la divinité de la Vie et de la Mort, Arlénor, a façonné le monde..."
  },
  {
    "id": 4,
    "title": "La Guerre contre l'En-Bas",
    "zone": "Celestia",
    "description": "La magie du Monde d'Arlénor provient des cristaux laissés par les Anges et les Démons lors de la Création..."
  },
  {
    "id": 5,
    "title": "Le Cercle des Mages Evanell",
    "zone": "Celestia",
    "description": "La magie du Monde d'Arlénor provient des cristaux laissés par les Anges et les Démons lors de la Création..."
  },
  {
    "id": 6,
    "title": "Les Montagnes de Kazador",
    "zone": "Zones",
    "description": "Selon la légende connue par tous, la divinité de la Vie et de la Mort, Arlénor, a façonné le monde..."
  },
  {
    "id": 7,
    "title": "La Fôrêt d'Imerys",
    "zone": "Zones",
    "description": "La magie du Monde d'Arlénor provient des cristaux laissés par les Anges et les Démons lors de la Création..."
  },
  {
    "id": 8,
    "title": "L'Ile de Lumeck",
    "zone": "Zones",
    "description": "La magie du Monde d'Arlénor provient des cristaux laissés par les Anges et les Démons lors de la Création..."
  }
]
