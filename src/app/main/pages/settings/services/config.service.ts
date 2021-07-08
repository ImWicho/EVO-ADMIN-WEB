import {HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IDevice, INetwork, IOrganization } from 'app/shared/interfaces/iconfig';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  constructor(private http: HttpClient) { }

  getOrganizations(): Observable<IOrganization[]>{
    return this.http.get<IOrganization[]>(`${environment.API_URL}/configuration/list/organizations/`);
  }

  updateOrganization(org: IOrganization): Observable<any>{
    return this.http.put<IOrganization>(`${environment.API_URL}/configuration/modify/organization/${org.id_organization}/`, org);
  }

  getNetworks(meraki_id_org: string): Observable<INetwork[]>{
    return this.http.get<INetwork[]>(`${environment.API_URL}/configuration/list/networks/from/${meraki_id_org}/`);
  }

  updateNetwork(net: INetwork): Observable<any>{
    return this.http.put<any>(`${environment.API_URL}/configuration/modify/network/${net.id_network}/`, net);
  }

  getDevices(meraki_id_net: string): Observable<IDevice[]>{
    return this.http.get<IDevice[]>(`${environment.API_URL}/configuration/list/devices/from/${meraki_id_net}/`);
  }

  updateDevice(dev: IDevice): Observable<any>{
    return this.http.put<any>(`${environment.API_URL}/configuration/modify/device/${dev.id_device}/`, dev);
  }

  saveNewArea(area: any): Observable<any>{
    return this.http.post<any>(`${environment.API_URL}/configuration/add/new/area/`, area);
  }

  updateArea(area: any): Observable<any>{
    return this.http.put<any>(`${environment.API_URL}/configuration/modify/area/${area.id_data}/`, area);
  }

  saveImagetoArea(images: any, id: number | string): Promise<any>{
    return this.http.put<any>(`${environment.API_URL}configuration/add/image/to/area/${id}/`, images).toPromise();
  }

  getAreasByNetwork(id_network: number): Observable<any>{
    return this.http.get<any>(`${environment.API_URL}/configuration/list/areas/in/${id_network}/`);
  }

  getAreas(): Observable<any>{
    return this.http.get<any>(`${environment.API_URL}/configuration/list/all/areas/`);
  }

  addDevicesToArea(data: any): Observable<any>{
    return this.http.post<any>(`${environment.API_URL}/configuration/add/devices/to/area/`, data);
  }


  // SPLASHES

  saveSplashLogin(splash: any): Promise<any>{
    return this.http.post<any>(`${environment.API_URL}/splashes/add/whole/login/`, splash).toPromise();
  }

  updateSplashLogin(splash: any): Observable<any>{
    return this.http.put<any>(`${environment.API_URL}/splashes/modify/login/${splash.id_splash}/`, splash);
  }


  desactivateSplashLogin(id: number): Observable<any>{
    return this.http.put<any>(`${environment.API_URL}/splashes/erase/splash/login/${id}/`, id);
  }

  saveImagetoSplash(images: any, id: number | string): Promise<any>{
    return this.http.put<any>(`${environment.API_URL}/splashes/add/login/images/into/${id}/`, images).toPromise();
  }

  getSplashesLogin(): Observable<any>{
    return this.http.get<any>(`${environment.API_URL}/splashes/list/all/logins/`);
  }

  publishSplash(data: any): Observable<any>{
    return this.http.put<any>(`${environment.API_URL}/splashes/publish/splash/login/${data.id}/`, data);
  }
}
