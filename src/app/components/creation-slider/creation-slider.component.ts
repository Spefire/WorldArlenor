import { Component, Input, Output, EventEmitter, AfterViewInit, ElementRef} from '@angular/core';

@Component({
  selector: 'creation-slider',
  templateUrl: './creation-slider.component.html',
  styleUrls: ['./creation-slider.component.scss']
})
export class CreationSliderComponent implements AfterViewInit {

	@Input() public name:string;
	@Input() public help:string;
	@Input() public type:string;
	@Input() public value:number;
	@Input() public min:number;
	@Input() public max:number;
	@Output() pointsValueChange = new EventEmitter();

	public displayHelpClick: boolean;
	public displayHelpHover: boolean;
	public rangeSlider: any;

	constructor(private elementRef:ElementRef) {
	}

	ngAfterViewInit() {
		this.rangeSlider = this.elementRef.nativeElement.querySelector("#cs-range-line");
		this.rangeSlider.addEventListener("input", this.valueChange.bind(this));
	}

	toogleHelp() {
		this.displayHelpClick = !this.displayHelpClick;
	}

	valueChange() {
		this.pointsValueChange.emit({type : this.type, value : this.rangeSlider.value});
	}
}