import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  constructor(private titleService: Title, private meta: Meta, translate: TranslateService) {
    this.titleService.setTitle(translate.instant('PAGE.ABOUT.TITLE'));
    this.meta.updateTag({ name: 'description', content: translate.instant('PAGE.ABOUT.DESCRIPTION') });
  }

  ngOnInit() {
  }

}
