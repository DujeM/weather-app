import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Forecast, Weather } from '../models/weather.model';
import { Observable, of, tap } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  readonly baseUrl = environment.apiUrl;
  readonly apiKey = environment.apiKey;
  readonly CACHE = 'cache';
  readonly CACHE_DURATION = 24 * 60 * 60 * 1000;

  constructor(private http: HttpClient) {}

  getCurrent(lat: number, lon: number): Observable<Weather> {
    return this.http.get<Weather>(
      `${this.baseUrl}/weather?lat=${lat}&lon=${lon}&appid=${this.apiKey}&units=metric`
    );
  }

  getForecast(lat: number, lon: number) {
    const cachedData = localStorage.getItem(this.CACHE);

    if (cachedData) {
      const { data, expiration } = JSON.parse(cachedData);

      if (expiration > Date.now()) {
        return of(data);
      }
    }

    return this.http
      .get<Forecast>(
        `${this.baseUrl}/forecast?lat=${lat}&lon=${lon}&appid=${this.apiKey}&units=metric`
      )
      .pipe(
        tap((data) => {
          const expiration = Date.now() + this.CACHE_DURATION;
          localStorage.setItem(
            this.CACHE,
            JSON.stringify({ data, expiration })
          );
        })
      );
  }
}
