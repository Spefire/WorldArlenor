import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Fact } from '../../models/fact.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [ApiService]
})
export class HomeComponent implements OnInit {

  public listFacts:Fact[];

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.listFacts = this.apiService.getFacts();
  }

}
