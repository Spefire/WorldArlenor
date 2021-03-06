import { Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { RoutesService } from "../../../services/routes.service";

@Component({
  selector: "app-crystals",
  templateUrl: "./crystals.component.html",
  styleUrls: ["./crystals.component.scss"],
  providers: [RoutesService]
})
export class CrystalsComponent {
  constructor(private routesService: RoutesService, private route: ActivatedRoute) {
    this.routesService.setTitleMetas("CRYSTALS");
  }
}
