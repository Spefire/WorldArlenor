import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-roleplay',
  templateUrl: './roleplay.component.html',
  styleUrls: ['./roleplay.component.scss']
})
export class RoleplayComponent implements OnInit {

  constructor(private titleService: Title, private meta: Meta, translate: TranslateService) {
    this.titleService.setTitle(translate.instant('PAGE.ROLEPLAY.TITLE'));
    this.meta.updateTag({ name: 'description', content: translate.instant('PAGE.ROLEPLAY.DESCRIPTION') });
  }

  ngOnInit() {
  }

}
