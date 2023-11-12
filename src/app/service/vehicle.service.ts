import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {

  private apiUrl = 'https://public.opendatasoft.com/api/explore/v2.1/catalog/datasets/all-vehicles-model/records?limit=45';

  constructor(private http: HttpClient) { }

  getVehicleData(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }
}
