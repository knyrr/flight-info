import { Component, inject, OnInit } from '@angular/core';
import { FlightsService } from '../../services/flights.service';

@Component({
  selector: 'app-flights',
  imports: [],
  templateUrl: './flights.component.html',
  styleUrl: './flights.component.css',
})
export class FlightsComponent implements OnInit {
  flightService = inject(FlightsService);
  ngOnInit(): void {
    console.log(this.flightService);
  }
}
