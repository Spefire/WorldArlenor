import { Component, Input, Output, EventEmitter, AfterViewInit, ElementRef } from '@angular/core';

@Component({
	selector: 'creation-slider',
	templateUrl: './creation-slider.component.html',
	styleUrls: ['./creation-slider.component.scss']
})
export class CreationSliderComponent implements AfterViewInit {

	@Input() public name: string;
	@Input() public help: string;
	@Input() public type: string;
	@Input() public value: number;
	@Input() public min: number;
	@Input() public max: number;
	@Output() pointsValueChange = new EventEmitter();

	public canUp: boolean;
	public canDown: boolean;
	public displayHelpClick: boolean;
	public displayHelpHover: boolean;
	public rangeSlider: any;

	constructor(private elementRef: ElementRef) {
		this.canUp = true;
		this.canDown = false;
	}

	ngAfterViewInit() {
		this.rangeSlider = this.elementRef.nativeElement.querySelector("#cs-range-line");
		this.rangeSlider.addEventListener("input", this.valueChange.bind(this));
	}

	toogleHelp() {
		this.displayHelpClick = !this.displayHelpClick;
	}

	downValue() {
		if (this.canDown) {
			this.value--;
			this.canUp = true;
			if (this.value <= this.min) this.canDown = false;
			this.valueChange();
		}
	}

	upValue() {
		if (this.canUp) {
			this.value++;
			this.canDown = true;
			if (this.value >= this.max) this.canUp = false;
			this.valueChange();
		}
	}

	valueChange() {
		this.pointsValueChange.emit({ type: this.type, value: this.value });
	}
}