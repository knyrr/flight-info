import { Component, effect, inject, OnInit, signal } from '@angular/core';
import { FlightService } from '../../services/flight.service';
import { Flight } from '../../model/flight.type';
import { AirportService } from '../../services/airport.service';
import { environment } from '../../../environments/environment';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-flights',
  imports: [CommonModule, MatCardModule],
  templateUrl: './flights.component.html',
  styleUrl: './flights.component.css',
})
export class FlightsComponent {
  flightService = inject(FlightService);
  airportService = inject(AirportService);
  flights = signal<Array<Flight>>([]);

  constructor() {
    effect(() => {
      const airport = this.airportService.selectedAirport();
      if (airport && airport.iata_code) {
        if (environment.isRequestLive === true) {
          this.flightService
            .getLiveFlights(airport.iata_code)
            .subscribe((flights: Flight[]) => {
              this.flights.set(flights);
            });
        } else {
          this.flights.set(this.flightService.getMockFlights());
        }
      }
    });
  }
}
