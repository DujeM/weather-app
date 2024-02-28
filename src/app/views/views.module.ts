import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ViewsRoutingModule } from './views-routing.module';
import { CurrentWeatherComponent } from './current-weather/current-weather.component';
import { HttpClientModule } from '@angular/common/http';
import { ForecastComponent } from './forecast/forecast.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [CurrentWeatherComponent, ForecastComponent],
  imports: [CommonModule, ViewsRoutingModule, HttpClientModule, SharedModule],
})
export class ViewsModule {}
