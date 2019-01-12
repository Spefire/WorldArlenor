import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';


@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {

	public bigfooter:boolean;
	private route:string;

  constructor(location: Location, router: Router) {
    router.events.subscribe((val) => {
			var currentLocation = location.path();
			this.route = currentLocation.split("/")[1];
			this.bigfooter = true;
			if (this.route == undefined) this.bigfooter = false;
    });
  }

}
