import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AirportsComponent } from './components/airports/airports.component';
import { FlightsComponent } from './components/flights/flights.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './components/header/header.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HomeComponent, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'flight-info';
}
