import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
	selector: 'creation-popup',
	templateUrl: './creation-popup.component.html',
	styleUrls: ['./creation-popup.component.scss']
})
export class CreationPopupComponent {

	@Input() public text: string;
	@Output() onClosePopup = new EventEmitter();

	constructor() { }

	closePopup() {
		this.onClosePopup.emit();
	}
}
