import { Component, effect, inject, OnInit, signal } from '@angular/core';
import { FlightService } from '../../services/flight.service';
import { Flight } from '../../model/flight.type';
import { AirportService } from '../../services/airport.service';

@Component({
  selector: 'app-flights',
  imports: [],
  templateUrl: './flights.component.html',
  styleUrl: './flights.component.css',
})
export class FlightsComponent {
  flightService = inject(FlightService);
  airportService = inject(AirportService);
  flights = signal<Array<Flight>>([]);
  // ngOnInit(): void {
  //   this.flights.set(this.flightService.getFlights());
  //   //console.log(this.flightService.getFlights());
  // }

  constructor() {
    effect(() => {
      const airport = this.airportService.activeAirport();
      if (airport && airport.iata_code) {
        this.flights.set(this.flightService.getFlights(airport.iata_code));
      }
    });
  }
}
