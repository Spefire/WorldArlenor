import { Component, OnInit, Input } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

	public route:string;
	public listDisplayed:boolean;

  constructor(location: Location, router: Router) {
    router.events.subscribe((val) => {
       var currentLocation = location.path();
       this.route = currentLocation.split("/")[1];
    });
  }

  ngOnInit() {
	}

	toggleList() {
		this.listDisplayed = !this.listDisplayed;
	}

}
