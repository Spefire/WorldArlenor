import { Component, OnInit } from '@angular/core';
import { RoutesService } from '../../services/routes.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
  providers: [RoutesService]
})
export class AboutComponent implements OnInit {

  constructor(private routesService: RoutesService) {
    this.routesService.setTitleMetas("ABOUT");
  }

  ngOnInit() {
  }

}
