import { Component } from '@angular/core';
import { RoutesService } from '../../services/routes.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [RoutesService]
})
export class HomeComponent {

  private selection:string;

  constructor(private routesService: RoutesService) {
    this.routesService.setTitleMetas("HOME");
    this.selection = "universe";
  }

  changeSelection(newSelection:string) {
    this.selection = newSelection;
  }

}
