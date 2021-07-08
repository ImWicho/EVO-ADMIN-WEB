import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { AppState } from 'app/app.reducer';
import { Subscription } from 'rxjs';
import { ConfigService } from '../../services/config.service';
import { NewAreaDialogComponent } from '../new-area-dialog/new-area-dialog.component';

@Component({
  selector: 'app-areas-table',
  templateUrl: './areas-table.component.html',
  styleUrls: ['./areas-table.component.scss'],
  animations: [
    trigger('toggle',[
      state('collapsed', style({ height : '0px', minHeight: '0'})),
      state('expanded', style({ height : '*' })),
      transition('collapsed <=> expanded', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)'))
    ])
  ]
})
export class AreasTableComponent implements OnInit, OnDestroy {
  @Output() addOrUpdateArea: EventEmitter<boolean> = new EventEmitter<boolean>();
  isExpanded = true;
  areas: any[] = [];
  subscription!: Subscription;
  constructor(private dialog: MatDialog,
              private service: ConfigService,
              private store: Store<AppState>) { }

  ngOnInit(): void {
    this.getAreas();
  }

  ngOnDestroy(): void{
    this.subscription.unsubscribe();
  }

  getAreas(): void{
    // this.service.getAreas().subscribe((data) => {
    //   this.areas = data;
    // });
    this.subscription = this.store.select('spaces').subscribe((data) => this.areas = data.areas);
  }

  toggle(): void{
    this.isExpanded = !this.isExpanded;
  }

  openNewAreaDialog(data: any | null) {
    const dialog = this.dialog.open(NewAreaDialogComponent, {
      autoFocus: true,
      disableClose: true,
      width: '500px',
      data
    });

    dialog.afterClosed().subscribe((res) => {
      if(res){
        // this.getAreas();
        this.addOrUpdateArea.emit(true);
      }
    });
  }

}
