import { Component, OnDestroy, OnInit } from '@angular/core';
import { WeatherService } from '../../core/services';
import { LocationService } from '../../core/services/location.service';
import {
  switchMap,
  catchError,
  of,
  EMPTY,
  takeUntil,
  Subject,
  Observable,
} from 'rxjs';
import { Forecast, Weather } from '../../core/models/weather.model';

const DAY_LIMIT = 4;
const INDEX_NOT_FOUND = -1;

@Component({
  selector: 'app-forecast',
  templateUrl: './forecast.component.html',
  styleUrl: './forecast.component.scss',
})
export class ForecastComponent implements OnInit, OnDestroy {
  private ngUnsubscribe = new Subject<void>();
  error$ = new Observable<GeolocationPositionError>();
  forecast!: Forecast;
  forecastByDays: Weather[][] = [];
  selectedForecast: Weather[] = [];

  constructor(
    private weatherService: WeatherService,
    private locationService: LocationService
  ) {}

  ngOnInit(): void {
    this.locationService
      .get()
      .pipe(
        switchMap((coords: GeolocationCoordinates) => {
          return this.weatherService.getForecast(
            coords.latitude,
            coords.longitude
          );
        }),
        catchError((err: GeolocationPositionError) => {
          this.error$ = of(err);
          return EMPTY;
        }),
        takeUntil(this.ngUnsubscribe)
      )
      .subscribe((res: Forecast) => {
        this.forecast = res;
        this.splitForecastIntoDays(
          this.forecast.list.filter(
            (w) => new Date(w.dt_txt).getDay() !== new Date().getDay()
          )
        );
      });
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  splitForecastIntoDays(arr: Weather[]) {
    this.forecastByDays = arr.reduce((forecastByDays, weather) => {
      const index = forecastByDays.findIndex(
        (weatherList) =>
          new Date(weatherList[0].dt_txt).getDay() ===
          new Date(weather.dt_txt).getDay()
      );

      if (index === INDEX_NOT_FOUND && forecastByDays.length < DAY_LIMIT) {
        forecastByDays.push([weather]);
      }

      if (index !== INDEX_NOT_FOUND) {
        forecastByDays[index].push(weather);
      }

      return forecastByDays;
    }, [] as Weather[][]);
  }

  getMinimumTemperature(index: number) {
    return this.forecastByDays[index].reduce(
      (min, weather) => (weather.main.temp < min ? weather.main.temp : min),
      this.forecastByDays[index][0].main.temp
    );
  }

  getMaximumtemperature(index: number) {
    return this.forecastByDays[index].reduce(
      (max, weather) => (weather.main.temp > max ? weather.main.temp : max),
      this.forecastByDays[index][0].main.temp
    );
  }

  getAverageTemperature(index: number) {
    return (
      this.forecastByDays[index].reduce(
        (total, weather) => (total += weather.main.temp),
        this.forecastByDays[index][0].main.temp
      ) / this.forecastByDays[index].length
    ).toFixed(2);
  }
}
