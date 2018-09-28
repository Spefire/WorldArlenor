import { Component, OnInit } from '@angular/core';
import { Fact } from '../../../models/fact.model';
import { ApiService } from '../../../services/api.service';
import { RoutesService } from '../../../services/routes.service';

@Component({
  selector: 'app-celestia',
  templateUrl: './celestia.component.html',
  styleUrls: ['./celestia.component.scss'],
  providers: [ApiService, RoutesService]
})
export class CelestiaComponent implements OnInit {

  public listFacts:Fact[];

  constructor(private apiService: ApiService, private routesService: RoutesService) {
    this.routesService.setTitleMetas("UNIVERSE");
  }

  ngOnInit() {
    this.listFacts = this.apiService.getFacts();
  }
}
