import { Pipe, PipeTransform } from '@angular/core';
import { Airport } from '../model/airport.type';

@Pipe({
  name: 'filterAirports',
})
export class FilterAirportsPipe implements PipeTransform {
  transform(airports: Airport[], searchTerm: string): Airport[] {
    if (!searchTerm) {
      return airports;
    }
    const text = searchTerm.toLowerCase();
    return airports.filter((airport) => {
      return airport.name.toLowerCase().includes(text);
    });
  }
}
