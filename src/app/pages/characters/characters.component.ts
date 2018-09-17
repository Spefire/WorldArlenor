import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-characters',
  templateUrl: './characters.component.html',
  styleUrls: ['./characters.component.scss']
})
export class CharactersComponent implements OnInit {

  constructor(private titleService: Title, private meta: Meta, translate: TranslateService) {
    this.titleService.setTitle(translate.instant('PAGE.CHARACTERS.TITLE'));
    this.meta.updateTag({ name: 'description', content: translate.instant('PAGE.CHARACTERS.DESCRIPTION') });
  }

  ngOnInit() {
  }

}
