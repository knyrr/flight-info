import { Component } from '@angular/core';
import { AirportsComponent } from '../components/airports/airports.component';
import { FlightsComponent } from '../components/flights/flights.component';
import { MapComponent } from '../components/map/map.component';

@Component({
  selector: 'app-home',
  imports: [AirportsComponent, FlightsComponent, MapComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {}
