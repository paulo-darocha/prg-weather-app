import { Component } from "@angular/core";
import { FlexModule } from "@ngbracket/ngx-layout";
import { CurrentWeatherComponent } from "./current-weather/current-weather.component";
import { MatCardModule } from "@angular/material/card";
import { MatToolbarModule } from "@angular/material/toolbar";

@Component({
   selector: "app-root",
   standalone: true,
   imports: [FlexModule, CurrentWeatherComponent, MatToolbarModule, MatCardModule],
   templateUrl: "./app.component.html",
   styleUrl: "./app.component.scss",
})
export class AppComponent {}
