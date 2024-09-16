import { DatePipe, DecimalPipe } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { FlexModule } from "@ngbracket/ngx-layout/flex";
import { WeatherService } from "../weather/weather.service";
import { ICurrentWeather } from "../interfaces";

@Component({
   selector: "app-current-weather",
   standalone: true,
   imports: [FlexModule, DecimalPipe, DatePipe],
   templateUrl: "./current-weather.component.html",
   styleUrl: "./current-weather.component.scss",
})
export class CurrentWeatherComponent implements OnInit {
   constructor(private weatherService: WeatherService) {}
   current!: ICurrentWeather;

   ngOnInit() {
      this.weatherService
         .getCurrentWeather("Porto", "PT")
         .subscribe((res) => (this.current = res));
   }

   getOrdinal(date: number) {
      const n = new Date(date).getDate();
      return n > 0
         ? ["th", "st", "nd", "rd"][(n > 3 && n < 21) || n % 10 > 3 ? 0 : n % 10]
         : "";
   }
}
