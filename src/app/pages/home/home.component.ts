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
	private scrollValue:number;

  constructor(private routesService: RoutesService) {
		this.routesService.setTitleMetas("HOME");
		window.addEventListener('mousewheel', this.mouseWheelEvent.bind(this));
		window.addEventListener('DOMMouseScroll', this.mouseWheelEvent.bind(this));
	}

	mouseWheelEvent(e) {
		this.scrollValue += e.wheelDelta ? e.wheelDelta : -e.detail;
		if (this.scrollValue >= 360) {
			this.scrollValue = -120;
			this.decreaseSelection();
			this.sub.unsubscribe();
			this.sub = interval(8000).subscribe((val) => {
				this.increaseSelection();
			});
		} else if (this.scrollValue <= -360) {
			this.scrollValue = 120;
			this.increaseSelection();
			this.sub.unsubscribe();
			this.sub = interval(8000).subscribe((val) => {
				this.increaseSelection();
			});
		}
	}

	ngOnInit() {
		this.selection = 0;
		this.scrollValue = 0;
		this.sub = interval(8000).subscribe((val) => {
			this.increaseSelection();
		});
	}

	increaseSelection() {
		if (this.selection == 0) this.selection = 1;
		else if (this.selection == 1) this.selection = 2;
		else if (this.selection == 2) this.selection = 0;
	}

	decreaseSelection() {
		if (this.selection == 0) this.selection = 2;
		else if (this.selection == 1) this.selection = 0;
		else if (this.selection == 2) this.selection = 1;
	}

  setSelection(newSelection:number) {
		this.selection = newSelection;
		this.sub.unsubscribe();
		this.sub = interval(8000).subscribe((val) => {
			this.increaseSelection();
		});
	}

	ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
