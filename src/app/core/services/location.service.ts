import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LocationService {
  constructor() {}

  get(): Observable<GeolocationCoordinates> {
    return new Observable((obs) => {
      navigator.geolocation.getCurrentPosition(
        (response) => {
          obs.next(response.coords);
          obs.complete();
        },
        (error) => {
          obs.error(error);
        }
      );
    });
  }
}
