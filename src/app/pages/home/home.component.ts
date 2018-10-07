import { Component, OnInit, OnDestroy } from '@angular/core';
import { interval } from 'rxjs';
import { RoutesService } from '../../services/routes.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [RoutesService]
})
export class HomeComponent implements OnInit, OnDestroy {

	private sub:any;
  private selection:number;

  constructor(private routesService: RoutesService) {
    this.routesService.setTitleMetas("HOME");
	}

	ngOnInit() {
		this.selection = 0;
		this.sub = interval(10000).subscribe((val) => {
			this.changeSelection();
		});
	}

	changeSelection() {
		console.log("CHANGE");
		if (this.selection == 0) this.selection = 1;
		else if (this.selection == 1) this.selection = 2;
		else if (this.selection == 2) this.selection = 0;
	}

  setSelection(newSelection:number) {
		this.selection = newSelection;
		this.sub.unsubscribe();
		this.sub = interval(10000).subscribe((val) => {
			this.changeSelection();
		});
	}

	ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
