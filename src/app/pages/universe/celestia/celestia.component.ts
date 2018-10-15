import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RoutesService } from '../../../services/routes.service';

@Component({
  selector: 'app-celestia',
  templateUrl: './celestia.component.html',
  styleUrls: ['./celestia.component.scss'],
  providers: [RoutesService]
})
export class CelestiaComponent {

  constructor(private routesService: RoutesService, private route: ActivatedRoute) {
    this.routesService.setTitleMetas("FACT");
  }
}
