import { BehaviorSubject, first, map, Observable, switchMap } from "rxjs";
import { ICurrentWeather } from "../interfaces";
import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { defaultPostalCode, PostalCodeService } from "../postal-code/postal-code.service";
import { environment } from "../../environments/environment";

export interface ICurrentWeatherData {
   weather: [{ description: string; icon: string }];
   main: { temp: number };
   sys: { country: string };
   dt: number;
   name: string;
}

export interface IWeatherService {
   currentWeather$: BehaviorSubject<ICurrentWeather>;
   getCurrentWeather(searchText: string, country?: string): Observable<ICurrentWeather>;
   getCurrentWeatherByCoords(coords: GeolocationCoordinates): Observable<ICurrentWeather>;
   updateCurrentWeather(search: string, country?: string): void;
}

@Injectable({ providedIn: "root" })
export class WeatherService implements IWeatherService {
   constructor(
      private httpClient: HttpClient,
      private postalCodeService: PostalCodeService
   ) {}

   readonly currentWeather$ = new BehaviorSubject<ICurrentWeather>({
      city: "--",
      country: "--",
      date: Date.now(),
      image: "",
      temperature: 0,
      description: "",
   });

   getCurrentWeather(searchText: string, country?: string): Observable<ICurrentWeather> {
      return this.postalCodeService.resolvePostalCode(searchText).pipe(
         switchMap((postalCode) => {
            if (postalCode && postalCode !== defaultPostalCode) {
               return this.getCurrentWeatherByCoords({
                  latitude: postalCode.lat,
                  longitude: postalCode.lng,
               } as GeolocationCoordinates);
            } else {
               const uriParams = new HttpParams().set(
                  "q",
                  country ? `${searchText},${country}` : searchText
               );
               return this.getCurrentWeatherHelper(uriParams);
            }
         })
      );
   }

   getCurrentWeatherByCoords(
      coords: GeolocationCoordinates
   ): Observable<ICurrentWeather> {
      const uriParams = new HttpParams()
         .set("lat", coords.latitude.toString())
         .set("lon", coords.longitude.toString());

      return this.getCurrentWeatherHelper(uriParams);
   }

   updateCurrentWeather(search: string, country?: string): void {
      this.getCurrentWeather(search, country)
         .pipe(first())
         .subscribe((weather) => this.currentWeather$.next(weather));
   }

   // private methods

   private getCurrentWeatherHelper(uriParams: HttpParams): Observable<ICurrentWeather> {
      uriParams = uriParams.set("appid", environment.appId);

      return this.httpClient
         .get<ICurrentWeatherData>(
            `${environment.baseUrl}api.openweathermap.org/data/2.5/weather`,
            { params: uriParams }
         )
         .pipe(map((res) => this.transformToICurrentWeather(res)));
   }

   private transformToICurrentWeather(data: ICurrentWeatherData): ICurrentWeather {
      return {
         city: data.name,
         country: data.sys.country,
         date: data.dt * 1000,
         image: `http://openweathermap.org/img/w/${data.weather[0].icon}.png`,
         temperature: this.convertKelvinToCelsius(data.main.temp),
         description: data.weather[0].description,
      };
   }

   private convertKelvinToCelsius(kelvin: number): number {
      return kelvin - 273;
   }
}
