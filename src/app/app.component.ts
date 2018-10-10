import { Component, OnInit } from '@angular/core';
import { FlightsearchService } from './flightsearch.service';
import { FlightDetail } from './FlightDetail';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers:[FlightsearchService]
})
export class AppComponent implements OnInit {
  constructor(private searchService: FlightsearchService) { }
  title = 'Flight Search';
  flightNumber: string = "";
  origin: string = "";
  destination: string = "";
  dateOfJrny: string;
  msg: string = "load";
  flightDetails: FlightDetail[];
  ngOnInit() {
    //this.dateOfJrny=new Date();
  }
  search() {
    this.msg = "Searching";
    this.flightDetails = [];
    if(this.flightNumber){
    this.searchService.searchByFlightNumber(this.flightNumber, this.dateOfJrny)
      .subscribe((result: FlightDetail[]) => {
      this.flightDetails=result;
    });
  }else{
    console.log(this.origin);
    console.log(this.dateOfJrny)
    this.searchService.search(this.origin,this.destination, this.dateOfJrny)
    .subscribe((result: FlightDetail[]) => {
    this.flightDetails=result;
  });
  }
  }
  setMessage(data: string) {
    this.msg = data;
  }
}
