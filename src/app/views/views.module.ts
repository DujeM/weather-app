import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ViewsRoutingModule } from './views-routing.module';
import { CurrentWeatherComponent } from './current-weather/current-weather.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [CurrentWeatherComponent],
  imports: [CommonModule, ViewsRoutingModule, HttpClientModule],
})
export class ViewsModule {}
