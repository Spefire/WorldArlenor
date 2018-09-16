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
    "name": "Alphonse"
  }
]