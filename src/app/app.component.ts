import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";

@Component({
    selector: "app-root",
    //On permet d'afficher la vue correspondante
    templateUrl: "app.component.html",
    standalone: true,
    imports: [RouterOutlet],
})
export class AppComponent {}
