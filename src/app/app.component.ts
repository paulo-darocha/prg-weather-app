import { Component } from "@angular/core";
import { FlexModule } from "@ngbracket/ngx-layout";
import { CurrentWeatherComponent } from "./current-weather/current-weather.component";
import { MatCardModule } from "@angular/material/card";
import { MatToolbarModule } from "@angular/material/toolbar";
import { CitySearchComponent } from "./city-search/city-search.component";
import { CitySearchTpldrivenComponent } from "./city-search-tpldriven/city-search-tpldriven.component";

@Component({
   selector: "app-root",
   standalone: true,
   imports: [FlexModule, CurrentWeatherComponent, MatToolbarModule, MatCardModule, CitySearchComponent, CitySearchTpldrivenComponent],
   templateUrl: "./app.component.html",
   styleUrl: "./app.component.scss",
})
export class AppComponent {}
