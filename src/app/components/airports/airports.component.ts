import { Component, inject, OnInit, signal } from '@angular/core';
import { AirportService } from '../../services/airport.service';
import { Airport } from '../../model/airport.type';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { catchError, tap } from 'rxjs';
import { FilterAirportsPipe } from '../../pipes/filter-airports.pipe';

@Component({
  selector: 'app-airports',
  imports: [FormsModule, FilterAirportsPipe],
  templateUrl: './airports.component.html',
  styleUrl: './airports.component.css',
})
export class AirportsComponent implements OnInit {
  airportService = inject(AirportService);
  airports = signal<Array<Airport>>([]);
  searchTerm = signal('');

  ngOnInit(): void {
    // On mock request
    let airports: Airport[] = this.airportService.getAirports();
    this.airports.set(airports);
    if (airports.length > 0) {
      this.airportService.activeAirport.set(airports[0]);
    }
    // On live request
    // this.airportService
    //   .getAirports()
    //   .pipe(
    //     tap((airports: any) => this.airports.set(airports)),
    //     tap((airports: any) => this.activeAirport.set(airports[0])),
    //     catchError((error) => {
    //       console.error(error);
    //       throw error;
    //     })
    //   )
    //   .subscribe();
  }

  selectAirport(airport: any) {
    this.airportService.activeAirport.set(airport);
    console.log(airport);
  }
}
