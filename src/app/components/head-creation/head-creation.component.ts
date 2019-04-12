import { Component, Input } from '@angular/core';

@Component({
	selector: 'head-creation',
	templateUrl: './head-creation.component.html',
	styleUrls: ['./head-creation.component.scss']
})
export class HeadCreationComponent {

	@Input() public title: string;
	@Input() public section01: string;
	@Input() public section02: string;
	@Input() public section03: string;
	@Input() public imgLeft: string;
	@Input() public imgRight: string;

	constructor() { }

}
