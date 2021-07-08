import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VenueService {

  constructor(private http: HttpClient) { }

  getInfoArea(idArea: number): Observable<any>{
    return this.http.get(`${environment.API_URL}/footfall/list/area/data/${idArea}/`);
  }
}
