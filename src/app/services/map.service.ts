import { effect, inject, Injectable, signal } from '@angular/core';
import { AirportService } from './airport.service';
import { Airport } from '../model/airport.type';

@Injectable({
  providedIn: 'root',
})
export class MapService {
  airportService = inject(AirportService);
  center = signal<google.maps.LatLngLiteral>({
    lat: 60.7905397,
    lng: 9.0333118,
  });
}
