import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Flight } from '../model/flight.type';
import { osloSchedule } from '../mocks/oslo-schedule';
import { environment } from '../../environments/environment';
import { map } from 'rxjs';
import { Airport } from '../model/airport.type';

@Injectable({
  providedIn: 'root',
})
export class FlightService {
  http = inject(HttpClient);
  mockFlights: Array<Flight> = osloSchedule.response.map((flight) => ({
    ...flight,
    dep_time: new Date(flight.dep_time),
    dep_time_utc: new Date(flight.dep_time_utc),
  }));
  private apiKey = environment.airLabsApiKey;
  url = `https://airlabs.co/api/v9/schedules?api_key=${this.apiKey}&dep_iata=`;

  getMockFlights() {
    return this.mockFlights.slice(0, 5);
  }
  getLiveFlights(iataCode: string) {
    return this.http
      .get<{ response: any }>(this.url + iataCode)
      .pipe(map((data) => data.response.slice(0, 5)));
  }
}
