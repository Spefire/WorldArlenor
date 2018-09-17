import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Title, Meta } from '@angular/platform-browser';
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

  constructor(private titleService: Title, private meta: Meta, translate: TranslateService, private apiService: ApiService) {
    this.titleService.setTitle(translate.instant('PAGE.HOME.TITLE'));
    this.meta.updateTag({ name: 'description', content: translate.instant('PAGE.HOME.DESCRIPTION') });
  }

  ngOnInit() {
    this.listFacts = this.apiService.getFacts();
  }

}
