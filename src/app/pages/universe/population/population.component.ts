import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RoutesService } from '../../../services/routes.service';

@Component({
  selector: 'app-population',
  templateUrl: './population.component.html',
  styleUrls: ['./population.component.scss'],
  providers: [RoutesService]
})
export class PopulationComponent {

  constructor(private routesService: RoutesService, private route: ActivatedRoute) {
    this.routesService.setTitleMetas("POPULATION");
  }
}
