import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";
import { CurrentWeatherComponent } from "./current-weather.component";
import { injectSpy } from "angular-unit-test-helper";
import { WeatherService } from "../weather/weather.service";
import { of } from "rxjs";
import { fakeWeather } from "../weather/weather.service.fake";
import { By } from "@angular/platform-browser";

describe("CurrentWeatherComponent", () => {
   let component: CurrentWeatherComponent;
   let fixture: ComponentFixture<CurrentWeatherComponent>;
   let weatherServiceMock: jasmine.SpyObj<WeatherService>;

   beforeEach(waitForAsync(() => {
      const weatherServiceSpy = jasmine.createSpyObj("WeatherService", [
         "getCurrentWeather",
      ]);

      TestBed.configureTestingModule({
         imports: [CurrentWeatherComponent],
         providers: [{ provide: WeatherService, useValue: weatherServiceSpy }],
      }).compileComponents();

      // weatherServiceMock = TestBed.inject(WeatherService) as any;
      weatherServiceMock = injectSpy(WeatherService);
   }));

   beforeEach(() => {
      fixture = TestBed.createComponent(CurrentWeatherComponent);
      component = fixture.componentInstance;
   });

   it("should create", () => {
      // Arrange
      weatherServiceMock.getCurrentWeather.and.returnValue(of());

      // Act
      fixture.detectChanges();

      // Assert
      expect(component).toBeTruthy();
   });

   it("should get currentWeather from WeatherService", () => {
      // Arrange
      weatherServiceMock.getCurrentWeather.and.returnValue(of());

      // Act
      fixture.detectChanges();

      // Assert
      expect(weatherServiceMock.getCurrentWeather).toHaveBeenCalled();
   });

   it("should eargerly load currentWeather in Porto from weatherService", () => {
      // Arrange
      weatherServiceMock.getCurrentWeather.and.returnValue(of(fakeWeather));

      // Act
      fixture.detectChanges();

      // Assert
      expect(component.current).toBeDefined();
      expect(component.current.city).toEqual("Porto");
      expect(component.current.temperature).toEqual(280.32);

      // on DOM
      const debugEl = fixture.debugElement;
      const titleEl: HTMLElement = debugEl.query(By.css(".mat-headline-6")).nativeElement;
      expect(titleEl.textContent).toContain("Porto");
   });
});
