import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Fact } from '../../models/fact.model';

@Component({
  selector: 'app-universe',
  templateUrl: './universe.component.html',
  styleUrls: ['./universe.component.scss'],
  providers: [ApiService]
})
export class UniverseComponent implements OnInit {

  public listFacts:Fact[];

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.listFacts = this.apiService.getFacts();
  }

}
