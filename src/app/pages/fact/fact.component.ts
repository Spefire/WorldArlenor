import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Title, Meta } from '@angular/platform-browser';
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

  constructor(private titleService: Title, private meta: Meta, translate: TranslateService, private apiService: ApiService, private route: ActivatedRoute) {
    this.titleService.setTitle(translate.instant('PAGE.FACT.TITLE'));
    this.meta.updateTag({ name: 'description', content: translate.instant('PAGE.FACT.DESCRIPTION') });
  }

  ngOnInit() {
    this.getFact();
  }

  getFact(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.fact = this.apiService.getFact(id);
  }

}
