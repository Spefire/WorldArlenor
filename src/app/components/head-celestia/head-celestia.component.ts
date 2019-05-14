import { Component, Input } from '@angular/core';

@Component({
	selector: 'head-celestia',
	templateUrl: './head-celestia.component.html',
	styleUrls: ['./head-celestia.component.scss']
})
export class HeadCelestiaComponent {

	@Input() public title: string;
	@Input() public section01: string;
	@Input() public section02: string;
	@Input() public section03: string;
	@Input() public imgLeft: string;
	@Input() public imgRight: string;

	constructor() { }

}
