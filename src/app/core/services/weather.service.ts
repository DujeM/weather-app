import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  constructor(private http: HttpClient) {}

  getCurrent(lat: number, lon: number) {
    return this.http.get<any>(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=3e0d3d798ee780d1f1ef9b46bb0a019c`
    );
  }
}
