import { Component, OnInit } from '@angular/core';
import { Fact } from '../../../models/fact.model';
import { ApiService } from '../../../services/api.service';
import { RoutesService } from '../../../services/routes.service';

@Component({
  selector: 'app-jirakan',
  templateUrl: './jirakan.component.html',
  styleUrls: ['../universe-zones.component.scss'],
  providers: [ApiService, RoutesService]
})
export class JirakanComponent implements OnInit {

  public listFacts:Fact[];

  constructor(private apiService: ApiService, private routesService: RoutesService) {
    this.routesService.setTitleMetas("UNIVERSE");
  }

  ngOnInit() {
    this.listFacts = this.apiService.getFacts();
  }
}
