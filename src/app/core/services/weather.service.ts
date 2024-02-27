import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Weather } from '../models/weather.model';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  readonly baseUrl = environment.apiUrl;
  readonly apiKey = environment.apiKey;

  constructor(private http: HttpClient) {}

  getCurrent(lat: number, lon: number): Observable<Weather> {
    return this.http.get<Weather>(
      `${this.baseUrl}/weather?lat=${lat}&lon=${lon}&appid=${this.apiKey}&units=metric`
    );
  }
}
