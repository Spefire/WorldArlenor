import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Article } from '../../models/article.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss'],
  providers: [ApiService]
})
export class ArticleComponent implements OnInit {

  public article:Article;

  constructor(private apiService: ApiService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.getArticle();
  }
  
  getArticle(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.article = this.apiService.getArticle(id);
  }

}
