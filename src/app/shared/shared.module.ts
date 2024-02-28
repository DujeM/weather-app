import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GetDateDay } from './pipes';

@NgModule({
  declarations: [GetDateDay],
  imports: [CommonModule],
  exports: [GetDateDay],
})
export class SharedModule {}
