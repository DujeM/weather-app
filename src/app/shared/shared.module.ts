import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GetDateDay, GetDateHours } from './pipes';

@NgModule({
  declarations: [GetDateDay, GetDateHours],
  imports: [CommonModule],
  exports: [GetDateDay, GetDateHours],
})
export class SharedModule {}
