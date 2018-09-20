import { Injectable } from "@angular/core";
import { TranslateService } from '@ngx-translate/core';
import { Title, Meta } from '@angular/platform-browser';

@Injectable()
export class RoutesService {

  constructor(private titleService: Title, private meta: Meta, private translate: TranslateService) {}

  public setTitleMetas(pageName: string) {
    this.translate.get('PAGE.' + pageName + '.TITLE').subscribe((res: string) => {
      this.titleService.setTitle(this.translate.instant(res));
    });
    this.translate.get('PAGE.' + pageName + '.DESCRIPTION').subscribe((res: string) => {
      this.meta.updateTag({
        name: 'description',
        content: res
      });
    });
  }
}