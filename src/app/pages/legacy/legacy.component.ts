import { Component, OnInit } from '@angular/core';
import { RoutesService } from '../../services/routes.service';

@Component({
  selector: 'app-legacy',
  templateUrl: './legacy.component.html',
  styleUrls: ['./legacy.component.scss'],
  providers: [RoutesService]
})
export class LegacyComponent implements OnInit {

  constructor(private routesService: RoutesService) {
    this.routesService.setTitleMetas("LEGACY");
  }

  ngOnInit() {
  }

}
