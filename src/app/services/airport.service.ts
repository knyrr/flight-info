import { inject, Injectable } from '@angular/core';
import { Airport } from '../model/airport.type';
import { norwegianAirports } from '../mocks/norwegian-airports';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AirportService {
  http = inject(HttpClient);
  mockAirports: Array<Airport> = norwegianAirports.response;
  private apiKey = environment.airLabsApiKey;
  url = `https://airlabs.co/api/v9/airports?country_code=no&api_key=${this.apiKey}`;

  constructor() {}

  getAirports() {
    console.log(this.url);
    // Mock request
    return this.mockAirports;

    // Live request
    // return this.http.get<{ response: any }>(this.url).pipe(map((data) => data.response)); */
  }
}
