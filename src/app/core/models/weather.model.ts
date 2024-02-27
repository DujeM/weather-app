export interface Weather {
  base: string;
  clouds: Clouds;
  cod: number;
  coord: Coord;
  dt: number;
  id: number;
  main: Main;
  name: string;
  rain: LastHours;
  snow: LastHours;
  sys: Sys;
  timezone: number;
  visibility: number;
  weather: Conditions[];
  wind: Wind;
}

export interface Clouds {
  all: number;
}

export interface Coord {
  lat: number;
  lon: number;
}

export interface Main {
  feels_like: number;
  humidity: number;
  pressure: number;
  temp: number;
  temp_max: number;
  temp_min: number;
}

export interface LastHours {
  '1h': number;
  '3h': number;
}

export interface Sys {
  country: string;
  id: number;
  sunrise: number;
  sunset: number;
  type: number;
}

export interface Conditions {
  id: number;
  description: string;
  icon: string;
  main: string;
}

export interface Wind {
  deg: number;
  speed: number;
}
