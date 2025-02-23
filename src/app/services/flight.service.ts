import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Flight } from '../model/flight.type';
import { osloSchedule } from '../mocks/oslo-schedule';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class FlightService {
  http = inject(HttpClient);
  mockFlights: Array<Flight> = osloSchedule.response;
  private apiKey = environment.airLabsApiKey;
  url = `https://airlabs.co/api/v9/schedules?api_key=${this.apiKey}&dep_iata=`;
  //https://airlabs.co/api/v9/schedules?dep_iata=OSL&api_key=df6b2557-a999-4c57-a44f-813870720b1a

  getFlights(iataCode: string) {
    console.log(iataCode);
    // Mock request
    return this.mockFlights.slice(0, 5);

    // Live request
    // return this.http.get<{ response: any }>(this.url+iataCode).pipe(map((data) => data.response.filter((airport) => airport.icao_code !== null).slice(0, 5))); */
  }
}
