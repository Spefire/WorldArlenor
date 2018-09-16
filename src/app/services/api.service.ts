import {Injectable} from "@angular/core";
import 'rxjs/add/operator/map';

import { Article, articles } from '../models/article.model';

@Injectable()
export class ApiService {

  constructor() {}

  public getArticle(id:number): Article {
    var theArticle:Article;
    articles.forEach(element => {
      let article = new Article(JSON.stringify(element));
      if (article.id == id) theArticle = article;
    });
    return theArticle;
  }

  public getArticles(): Article[] {
    var listArticles:Article[] = [];
    articles.forEach(element => {
      let article = new Article(JSON.stringify(element));
      listArticles.push(article);
    });
    return listArticles;
  }
}