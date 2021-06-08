import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ArlenorObj } from 'src/app/models/creation.model';

@Component({
	selector: 'creation-popup',
	templateUrl: './creation-popup.component.html',
	styleUrls: ['./creation-popup.component.scss']
})
export class CreationPopupComponent implements OnInit {

	@Input() public element: ArlenorObj;
	@Output() onClosePopup = new EventEmitter();

	public specs: string;

	constructor() { }

	ngOnInit() {
		if (this.element.specs) {
			this.specs = "";
			this.element.specs.forEach((spe, i) => {
				this.specs += spe;
				if (i === this.element.specs.length - 1) this.specs += '.';
				else this.specs += ', ';
			});
		}
	}

	closePopup() {
		this.onClosePopup.emit();
	}
}
