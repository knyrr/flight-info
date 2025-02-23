import {
  Component,
  OnInit,
  signal,
  OnDestroy,
  effect,
  inject,
} from '@angular/core';
import { GoogleMapsModule } from '@angular/google-maps';
import { environment } from '../../../environments/environment';
import { AirportService } from '../../services/airport.service';
import { Airport } from '../../model/airport.type';

declare global {
  interface Window {
    initMap: () => void;
  }
}

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [GoogleMapsModule],
  templateUrl: './map.component.html',
  styleUrl: './map.component.css',
})
export class MapComponent implements OnInit, OnDestroy {
  airportService = inject(AirportService);
  isMapApiLoaded = signal<boolean>(false);
  center: google.maps.LatLngLiteral = { lat: 60.7905397, lng: 9.0333118 };
  zoom = 6;
  markers: google.maps.LatLngLiteral[] = [];

  ngOnInit() {
    this.loadGoogleMapsScript();
  }

  ngAfterViewInit(): void {
    window.initMap = this.initMap.bind(this);
  }

  ngOnDestroy(): void {
    window.initMap = null as any;
  }

  private loadGoogleMapsScript() {
    if (document.getElementById('google-maps-script')) {
      return;
    }

    const script = document.createElement('script');
    script.id = 'google-maps-script';
    script.src = `https://maps.googleapis.com/maps/api/js?key=${environment.googleMapsKey}&loading=async&&libraries=marker&callback=initMap`;
    script.async = true;
    script.defer = true;

    script.onerror = (error) => {
      console.error('Failed to load Google Maps script:', error);
    };

    document.body.appendChild(script);
  }

  private initMap() {
    if (window.google && window.google.maps) {
      this.isMapApiLoaded.set(true);
    } else {
      console.error('Google Maps API failed to load.');
    }
  }

  showFlights(airport: Airport) {
    this.airportService.activeAirport.set(airport);
  }

  getMarkerPin(airport: any): google.maps.marker.PinElement {
    const activeAirport = this.airportService.activeAirport();

    return new google.maps.marker.PinElement({
      glyphColor: 'blue',
      glyph: new URL(
        'https://maps.gstatic.com/mapfiles/place_api/icons/v2/airport_pinlet.svg'
      ),
      background:
        activeAirport && activeAirport.iata_code === airport.iata_code
          ? 'green'
          : 'red',
      borderColor: 'black',
      scale: 1,
    });
  }
}
