import { Component, Input, Output, EventEmitter } from "@angular/core";
import { ArlenorObj } from "src/app/models/creation.model";

@Component({
	selector: "creation-slider",
	templateUrl: "./creation-slider.component.html",
	styleUrls: ["./creation-slider.component.scss"]
})
export class CreationSliderComponent {
	@Input() public element: ArlenorObj;
	@Input() public value: number;
	@Input() public spe: string;
	@Input() public fixed: boolean;
	@Output() onValueChange = new EventEmitter();
	@Output() onSpeChange = new EventEmitter();
	@Output() onOpenPopup = new EventEmitter();

	@Input()
	set min(minValue: number) {
		this.valueMin = minValue;
	}

	@Input()
	set max(maxValue: number) {
		this.valueMax = maxValue;
	}

	public valueMin: number;
	public valueMax: number;

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
		this.onValueChange.emit({ code: this.element.code, value: this.value });
	}

	speChange(spe: string) {
		this.onSpeChange.emit({ code: this.element.code, spe: spe });
	}

	openPopup() {
		this.onOpenPopup.emit({ value: this.element });
	}
}
