import { Component, inject, OnInit, signal } from '@angular/core';
import { AirportService } from '../../services/airport.service';
import { Airport } from '../../model/airport.type';
import { FormsModule } from '@angular/forms';
import { catchError, map, tap, throwError } from 'rxjs';
import { FilterAirportsPipe } from '../../pipes/filter-airports.pipe';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-airports',
  imports: [FormsModule, FilterAirportsPipe],
  templateUrl: './airports.component.html',
  styleUrl: './airports.component.css',
})
export class AirportsComponent implements OnInit {
  airportService = inject(AirportService);
  searchTerm = signal('');

  ngOnInit(): void {
    if (environment.isRequestLive) {
      console.log('Requesting live airports');

      this.airportService
        .getLiveAirports()
        .pipe(
          map((airports: Airport[]) => {
            this.airportService.airports.set(airports);
            const foundAirport = airports.find(
              (airport) => airport.iata_code === 'OSL'
            );
            this.airportService.activeAirport.set(
              foundAirport || airports[0] || null
            );

            return airports;
          }),
          catchError((error) => {
            console.error('Error fetching live airports:', error);
            return throwError(() => error);
          })
        )
        .subscribe();
    } else {
      const airports: Airport[] = this.airportService.getMockAirports();
      this.airportService.airports.set(airports);
      const foundAirport = airports.find(
        (airport) => airport.iata_code === 'OSL'
      );
      this.airportService.activeAirport.set(
        foundAirport || airports[0] || null
      );
    }
  }

  selectAirport(airport: any) {
    this.airportService.activeAirport.set(airport);
    console.log(airport);
  }
}
