import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../../core/services';

@Component({
  selector: 'app-current-weather',
  templateUrl: './current-weather.component.html',
  styleUrl: './current-weather.component.scss',
})
export class CurrentWeatherComponent implements OnInit {
  constructor(private weatherService: WeatherService) {}

  ngOnInit(): void {
    navigator.geolocation.getCurrentPosition(
      (position: GeolocationPosition) => {
        console.log(position);
        this.weatherService
          .getCurrent(position.coords.latitude, position.coords.longitude)
          .subscribe(console.log);
      }
    );
  }
}
