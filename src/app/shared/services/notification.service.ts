import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NotificationComponent } from '@components/notification/notification.component';
import { Observable } from 'rxjs';

export interface INotification{
    icon: 'check' | 'alert' | 'close';
    title: string;
    text: string;
    hideCancel: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private snack: MatSnackBar, private dialog: MatDialog) { }

  openSnackBar(msg: string, time: number): Observable<void>{
    return this.snack.open(msg, undefined, { duration: time}).afterOpened();
  }

  showNotification(conf: INotification): Promise<boolean>{
    return this.dialog.open(NotificationComponent, {
      disableClose: true,
      width: '600px',
      height: 'auto',
      data: conf
    }).afterClosed().toPromise();
  }
}
