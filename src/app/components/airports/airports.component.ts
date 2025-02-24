import { Component, effect, inject, OnInit, signal } from '@angular/core';
import { AirportService } from '../../services/airport.service';
import { Airport } from '../../model/airport.type';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { catchError, map, Observable, startWith, tap, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-airports',
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatSidenavModule,
    MatInputModule,
    MatAutocompleteModule,
    AsyncPipe,
    ReactiveFormsModule,
  ],
  templateUrl: './airports.component.html',
  styleUrl: './airports.component.css',
})
export class AirportsComponent implements OnInit {
  airportService = inject(AirportService);
  searchTerm = signal('');

  airportOptions = this.airportService.airports();

  myControl = new FormControl<string | Airport>('');
  filteredOptions = new Observable<Airport[]>();

  constructor() {
    effect(() => {
      const airport = this.airportService.selectedAirport();
      if (airport) {
        this.myControl.setValue(airport);
        console.log(`Input updated: ${JSON.stringify(airport)}`);
      }
    });
  }

  ngOnInit(): void {
    if (environment.isRequestLive) {
      console.log('Requesting live airports');

      this.airportService
        .getLiveAirports()
        .pipe(
          map((airports: Airport[]) => {
            this.airportService.airports.set(airports);
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
    }
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map((value) => {
        const name = typeof value === 'string' ? value : value?.name;
        return name
          ? this._filter(name as string)
          : this.airportService.airports();
      })
    );
  }

  private _filter(value: string): Airport[] {
    const filterValue = value.toLowerCase();

    return this.airportService
      .airports()
      .filter((option) => option.name.toLowerCase().includes(filterValue));
  }

  displayFn(airport: Airport): string {
    return airport && airport.name ? airport.name : '';
  }

  selectAirport(event: any) {
    const selectedAirport = event.option.value;
    this.airportService.selectedAirport.set(selectedAirport);
    console.log('Selected:', selectedAirport);
  }
}
