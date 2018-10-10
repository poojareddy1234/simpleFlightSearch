import { Injectable } from '@angular/core';
import {Http} from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { FlightDetail } from './FlightDetail';
import 'rxjs/add/operator/map'
@Injectable()
export class FlightsearchService {

  constructor(private http:Http) { }
  

    search(origin: string, destination: string, dateOfJrny: string): Observable<any> {
        return this.http
        .get("searchservice/flightsearch/" + origin + "/" + destination + "/"+dateOfJrny).map(response => {
            console.log(response);
            return response.json();
        });
    }
    searchByFlightNumber(flightNumber: string, dateOfJrny: string): Observable<any> {
        return this.http.get("searchservice/flightsearchByNumber/" + flightNumber + "/"+dateOfJrny )
            .map(response => {
                console.log(response.json());
                return response.json();
            });
    }
    updateDate(): Observable<any> {
      return this.http.get("searchservice/updateDatedoc")
          .map(response => {
              console.log(response.json());
              return response.json();
          });
  }

}


