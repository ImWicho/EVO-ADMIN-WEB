import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { IPreview } from '../models/ipreview';

@Injectable({
  providedIn: 'root'
})
export class PreviewSplashService {

  constructor(private http: HttpClient) { }

  getSplash(id: number): Observable<IPreview[]>{
    return this.http.get<IPreview[]>(`${environment.API_URL}/splashes/list/login/complete/${id}/`);
  }

  sendData(data: any): Observable<any>{
    return this.http.post<any>(`${environment.API_URL}/footfall/add/splash/client/form/`, data);
  }
}
