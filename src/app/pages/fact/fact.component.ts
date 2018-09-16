import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Fact } from '../../models/fact.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-fact',
  templateUrl: './fact.component.html',
  styleUrls: ['./fact.component.scss'],
  providers: [ApiService]
})
export class FactComponent implements OnInit {

  public fact:Fact;

  constructor(private apiService: ApiService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.getFact();
  }
  
  getFact(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.fact = this.apiService.getFact(id);
  }

}
