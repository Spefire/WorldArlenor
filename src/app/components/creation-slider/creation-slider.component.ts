import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'creation-slider',
  templateUrl: './creation-slider.component.html',
  styleUrls: ['./creation-slider.component.scss']
})
export class CreationSliderComponent {

	@Input() public name:string;
	@Input() public type:string;
	@Input() public value:number;
	@Input() public min:number;
	@Input() public max:number;
	@Output() pointsValueChange = new EventEmitter();

	constructor() {}
	
	valueChanged(value) {
		this.pointsValueChange.emit({type : this.type, value : value});
	}

}
