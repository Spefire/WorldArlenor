import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RoutesService } from '../../../services/routes.service';

@Component({
  selector: 'app-evanell',
  templateUrl: './evanell.component.html',
  styleUrls: ['./evanell.component.scss'],
  providers: [RoutesService]
})
export class EvanellComponent {

  constructor(private routesService: RoutesService, private route: ActivatedRoute) {
    this.routesService.setTitleMetas("FACT");
  }
}
