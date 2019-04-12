import { Component, Input, Output, EventEmitter } from "@angular/core";

@Component({
	selector: "creation-slider",
	templateUrl: "./creation-slider.component.html",
	styleUrls: ["./creation-slider.component.scss"]
})
export class CreationSliderComponent {
	@Input() public name: string;
	@Input() public help: string;
	@Input() public type: string;
	@Input() public value: number;
	@Input() public spe: string;
	@Input() public hasSpecialistic: boolean;
	@Input() public hasCristalSpecialistic: boolean;
	@Output() onOpenPopup = new EventEmitter();
	@Output() onValueChange = new EventEmitter();
	@Output() onSpeChange = new EventEmitter();

	@Input()
	set min(minValue: number) {
		this.valueMin = minValue;
	}

	@Input()
	set max(maxValue: number) {
		this.valueMax = maxValue;
	}

	@Input()
	set specialistics(list: string) {
		list = list.replace(', ', ',');
		this.listSpecialistics = list.split(',');
	}

	public valueMin: number;
	public valueMax: number;
	public listSpecialistics: Array<string>;

	downValue() {
		if (parseInt(this.value.toString()) > parseInt(this.valueMin.toString())) {
			this.value--;
			this.valueChange();
		}
	}

	upValue() {
		if (parseInt(this.value.toString()) < parseInt(this.valueMax.toString())) {
			this.value++;
			this.valueChange();
		}
	}

	valueChange() {
		this.onValueChange.emit({ type: this.type, value: this.value });
	}

	speChange(spe: string) {
		this.onSpeChange.emit({ type: this.type, spe: spe });
	}

	openPopup() {
		this.onOpenPopup.emit({ value: this.help });
	}
}
