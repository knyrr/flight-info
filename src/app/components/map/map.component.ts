import { Component, OnInit, AfterViewInit } from '@angular/core';
import { GoogleMapsModule } from '@angular/google-maps';
import { environment } from '../../../environments/environment';

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
export class MapComponent implements OnInit, AfterViewInit {
  center: google.maps.LatLngLiteral = { lat: 24.799448, lng: 120.979021 };
  zoom = 14;

  ngOnInit(): void {
    this.loadGoogleMapsScript();
  }

  ngAfterViewInit(): void {
    window.initMap = this.initMap.bind(this);
  }

  private loadGoogleMapsScript() {
    if (document.getElementById('google-maps-script')) {
      return; // Script already loaded
    }

    const script = document.createElement('script');
    script.id = 'google-maps-script';
    script.src = `https://maps.googleapis.com/maps/api/js?key=${environment.googleMapsKey}&loading=async&callback=initMap`;
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);
  }

  private initMap(): void {
    new google.maps.Map(document.getElementById('map') as HTMLElement, {
      center: this.center,
      zoom: this.zoom,
    });
  }
}
