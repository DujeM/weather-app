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
    this.forecastByDays = arr.reduce((result, obj) => {
      // Find the index of the array corresponding to the date
      const index = result.findIndex(
        (item) =>
          item.length > 0 &&
          new Date(item[0].dt_txt).getDay() === new Date(obj.dt_txt).getDay()
      );

      // If date not found, create a new array and push the object
      if (index === -1) {
        if (result.length !== DAY_LIMIT) {
          result.push([obj]);
        }
      } else {
        // If date found, push the object to the existing array
        result[index].push(obj);
      }

      return result;
    }, [] as Weather[][]);

    console.log(this.forecastByDays);
  }

  getMinimumTemperature(index: number) {
    return this.forecastByDays[index].reduce(
      (min, obj) => (obj.main.temp < min ? obj.main.temp : min),
      this.forecastByDays[index][0].main.temp
    );
  }

  getMaximumtemperature(index: number) {
    return this.forecastByDays[index].reduce(
      (max, obj) => (obj.main.temp > max ? obj.main.temp : max),
      this.forecastByDays[index][0].main.temp
    );
  }

  getAverageTemperature(index: number) {
    return (
      this.forecastByDays[index].reduce(
        (total, obj) => (total += obj.main.temp),
        this.forecastByDays[index][0].main.temp
      ) / this.forecastByDays[index].length
    ).toFixed(2);
  }
}
