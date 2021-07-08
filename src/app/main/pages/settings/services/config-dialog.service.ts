import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfigDialogComponent } from '../components/config-dialog/config-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class ConfigDialogService {

  constructor(private dialog: MatDialog) { }

  openInputDialog(): Promise<any>{
    return this.dialog.open(ConfigDialogComponent,{
      disableClose: false,
      width: '1000px',
      height: 'auto'
    }).afterClosed().toPromise();
  }
}
