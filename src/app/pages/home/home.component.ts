import { Component, OnInit } from '@angular/core';
import { RoutesService } from '../../services/routes.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [RoutesService]
})
export class HomeComponent implements OnInit {

  constructor(private routesService: RoutesService) {
    this.routesService.setTitleMetas("HOME");
  }

  ngOnInit() {
  }

}
