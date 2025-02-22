import { Component, computed, effect, inject } from '@angular/core';
import { GoogleMapsModule } from '@angular/google-maps';
import { AirportService } from '../../services/airport.service';
import { Airport } from '../../model/airport.type';
import { MapService } from '../../services/map.service';

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [GoogleMapsModule],
  templateUrl: './map.component.html',
  styleUrl: './map.component.css',
})
export class MapComponent {
  mapService = inject(MapService);
  airportService = inject(AirportService);
  zoom = 6;
  //markers: google.maps.LatLngLiteral[] = [];
  //airports = computed(() => this.airportService.airports());

  constructor() {
    effect(() => {
      const airport = this.airportService.selectedAirport();
      if (airport) {
        this.mapService.center.set({ lat: airport.lat, lng: airport.lng });
        console.log(
          `Map center updated: ${JSON.stringify(this.mapService.center())}`
        );
      }
    });
  }

  selectAirport(airport: Airport) {
    console.log('Selected airport:', airport);
    this.airportService.selectedAirport.set(airport);
  }
}
