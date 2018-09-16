import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Article } from '../../models/article.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [ApiService]
})
export class HomeComponent implements OnInit {

  public listArticles:Article[];

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.listArticles = this.apiService.getArticles();
  }

}
