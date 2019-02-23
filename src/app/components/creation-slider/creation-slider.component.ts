import { Component, Input, Output, EventEmitter, OnInit } from "@angular/core";

@Component({
	selector: "creation-slider",
	templateUrl: "./creation-slider.component.html",
	styleUrls: ["./creation-slider.component.scss"]
})
export class CreationSliderComponent implements OnInit {
	@Input() public name: string;
	@Input() public help: string;
	@Input() public type: string;
	@Input() public value: number;
	@Input() public hasSpecialistic: boolean;
	@Input() public hasCristalSpecialistic: boolean;
	@Output() onOpenPopup = new EventEmitter();
	@Output() onValueChange = new EventEmitter();
	@Output() onSpeChange = new EventEmitter();

	@Input()
	set min(minValue: number) {
		this.valueMin = minValue;
		this.checkButtons();
	}

	@Input()
	set max(maxValue: number) {
		this.valueMax = maxValue;
		this.checkButtons();
	}

	@Input()
	set specialistics(list: string) {
		list = list.replace(', ', ',');
		this.listSpecialistics = list.split(',');
	}

	public valueMin: number;
	public valueMax: number;
	public spe;
	public canUp: boolean;
	public canDown: boolean;
	public listSpecialistics: Array<string>;

	ngOnInit() {
		this.checkButtons();
	}

	checkButtons() {
		this.canDown = this.value > this.valueMin;
		this.canUp = this.value < this.valueMax;
	}

	downValue() {
		if (this.canDown) {
			this.value--;
			this.checkButtons();
			this.valueChange();
		}
	}

	upValue() {
		if (this.canUp) {
			this.value++;
			this.checkButtons();
			this.valueChange();
		}
	}

	valueChange() {
		this.onValueChange.emit({ type: this.type, value: this.value });
	}

	speChange(spe: string) {
		this.spe = spe;
		this.onSpeChange.emit({ type: this.type, spe: this.spe });
	}

	openPopup() {
		this.onOpenPopup.emit({ value: this.help });
	}
}
