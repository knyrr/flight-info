import { Component, inject, OnInit, signal } from '@angular/core';
import { AirportService } from '../../services/airport.service';
import { Airport } from '../../model/airport.type';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { catchError } from 'rxjs';
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
    this.airports.set(this.airportService.getAirports());

    // On live request
    // this.airportService
    //   .getAirports()
    //   .pipe(
    //     catchError((error) => {
    //       console.error(error);
    //       throw error;
    //     })
    //   )
    //   .subscribe((airports: any) => {
    //     this.airports.set(airports);
    //   });
  }
}
