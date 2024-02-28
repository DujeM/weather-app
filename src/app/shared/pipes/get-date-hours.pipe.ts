import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'GetDateHours',
})
export class GetDateHours implements PipeTransform {
  transform(date: string): string {
    return `${new Date(date).getHours()}:00`;
  }
}
