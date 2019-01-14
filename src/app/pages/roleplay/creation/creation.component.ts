import { Component, OnInit } from '@angular/core';
import { RoutesService } from '../../../services/routes.service';

@Component({
  selector: 'app-creation',
  templateUrl: './creation.component.html',
  styleUrls: ['./creation.component.scss'],
  providers: [RoutesService]
})
export class CreationComponent implements OnInit {

  constructor(private routesService: RoutesService) {
    this.routesService.setTitleMetas("CREATION");
  }

  ngOnInit() {
  }

}
