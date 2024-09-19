import { Component } from "@angular/core";
import {
   FormControl,
   FormsModule,
   ReactiveFormsModule,
   Validators,
} from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { FlexModule } from "@ngbracket/ngx-layout";
import { WeatherService } from "../weather/weather.service";
import { debounceTime, filter, tap } from "rxjs";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";

@Component({
   selector: "app-city-search",
   standalone: true,
   imports: [
      FormsModule,
      ReactiveFormsModule,
      MatFormFieldModule,
      MatInputModule,
      FlexModule,
      MatIconModule,
      MatButtonModule,
   ],
   templateUrl: "./city-search.component.html",
   styleUrl: "./city-search.component.scss",
})
export class CitySearchComponent {
   search = new FormControl("", [Validators.required, Validators.minLength(2)]);

   constructor(private weatherService: WeatherService) {
      this.search.valueChanges
         .pipe(
            filter(() => this.search.valid),
            debounceTime(500),
            tap((searchValue) => this.doSearch(searchValue)),
            takeUntilDestroyed()
         )
         .subscribe();
   }

   doSearch(searchValue: string | null) {
      if (searchValue === null) return;
      const userInput = searchValue.split(",").map((x) => x.trim());
      const searchText = userInput[0];
      const country = userInput.length > 1 ? userInput[1] : undefined;
      this.weatherService.updateCurrentWeather(searchText, country);
   }
}
