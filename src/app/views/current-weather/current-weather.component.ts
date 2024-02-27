import { Component, OnDestroy, OnInit } from '@angular/core';
import { WeatherService } from '../../core/services';
import { LocationService } from '../../core/services/location.service';
import {
  EMPTY,
  Observable,
  Subject,
  catchError,
  of,
  switchMap,
  takeUntil,
} from 'rxjs';
import { Weather } from '../../core/models/weather.model';

@Component({
  selector: 'app-current-weather',
  templateUrl: './current-weather.component.html',
  styleUrl: './current-weather.component.scss',
})
export class CurrentWeatherComponent implements OnInit, OnDestroy {
  private ngUnsubscribe = new Subject<void>();
  weather$ = new Observable<Weather>();
  error$ = new Observable<GeolocationPositionError>();

  constructor(
    private weatherService: WeatherService,
    private locationService: LocationService
  ) {}

  ngOnInit(): void {
    this.weather$ = this.locationService.get().pipe(
      switchMap((coords: GeolocationCoordinates) => {
        return this.weatherService.getCurrent(
          coords.latitude,
          coords.longitude
        );
      }),
      catchError((err: GeolocationPositionError) => {
        this.error$ = of(err);
        return EMPTY;
      }),
      takeUntil(this.ngUnsubscribe)
    );
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
