import { inject, Injectable, signal } from '@angular/core';
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
  selectedAirport = signal<Airport | null>(null);
  airports = signal<Array<Airport>>([]);

  getMockAirports() {
    return this.mockAirports.filter((airport) => airport.iata_code !== null);
  }

  getLiveAirports() {
    return this.http
      .get<{ response: any }>(this.url)
      .pipe(
        map((data) =>
          data.response.filter((airport: any) => airport.iata_code !== null)
        )
      );
  }
}
