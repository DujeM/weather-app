import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'GetDateDay',
})
export class GetDateDay implements PipeTransform {
  days = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];

  transform(date: string): string {
    return this.days[new Date(date).getDay()];
  }
}
