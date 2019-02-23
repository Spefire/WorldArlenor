import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
	selector: 'popup',
	templateUrl: './popup.component.html',
	styleUrls: ['./popup.component.scss']
})
export class PopupComponent {

	@Input() public text: string;
	@Output() onClosePopup = new EventEmitter();

	constructor() { }

	closePopup() {
		this.onClosePopup.emit();
	}
}
