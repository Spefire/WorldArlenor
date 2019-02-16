import { Component, Input } from '@angular/core';

@Component({
	selector: 'head-universe',
	templateUrl: './head-universe.component.html',
	styleUrls: ['./head-universe.component.scss']
})
export class HeadUniverseComponent {

	@Input() public title: string;
	@Input() public section01: string;
	@Input() public section02: string;
	@Input() public section03: string;
	@Input() public imgLeft: string;
	@Input() public imgRight: string;

	constructor() { }

}
