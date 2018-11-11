import { Component, OnInit } from '@angular/core';
import { Fact } from '../../models/fact.model';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { RoutesService } from '../../services/routes.service';

@Component({
  selector: 'app-fact',
  templateUrl: './fact.component.html',
  styleUrls: ['./fact.component.scss'],
  providers: [ApiService, RoutesService]
})
export class FactComponent implements OnInit {

  public fact:Fact;

  constructor(private apiService: ApiService, private routesService: RoutesService, private route: ActivatedRoute) {
    this.routesService.setTitleMetas("FACT");
  }

  ngOnInit() {
    this.getFact();
  }

  getFact(): void {
    const id = +this.route.snapshot.paramMap.get('id');
		this.fact = this.apiService.getFact(id);
  }

}
