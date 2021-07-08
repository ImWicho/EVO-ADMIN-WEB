import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SidenavService {
  private toggle = new Subject<void>();

  constructor() { }

  get toggle$(): Subject<void>{
    return this.toggle;
  }
}
