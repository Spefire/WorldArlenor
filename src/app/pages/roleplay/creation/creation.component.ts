import { Component, OnInit } from '@angular/core';
import { RoutesService } from '../../../services/routes.service';
import jsPDF from 'jspdf';

@Component({
  selector: 'app-creation',
  templateUrl: './creation.component.html',
  styleUrls: ['./creation.component.scss'],
  providers: [RoutesService]
})
export class CreationComponent {

  constructor(private routesService: RoutesService) {
    this.routesService.setTitleMetas("CREATION");
  }

	downloadPDF() {
		var doc = new jsPDF();
		doc.setFontSize(40);
		doc.text(35, 25, 'Fiche de personnage');

		this.toDataURL('./assets/images/creation/Fond.png', function(dataUrl) {
			console.log('RESULT:', dataUrl);
			doc.addImage(dataUrl, 'JPEG', 15, 40, 180, 160);
			doc.save("a4.pdf");
		})
	}

	toDataURL(url, callback) {
		var xhr = new XMLHttpRequest();
		xhr.onload = function() {
			var reader = new FileReader();
			reader.onloadend = function() {
				callback(reader.result);
			}
			reader.readAsDataURL(xhr.response);
		};
		xhr.open('GET', url);
		xhr.responseType = 'blob';
		xhr.send();
	}
}
