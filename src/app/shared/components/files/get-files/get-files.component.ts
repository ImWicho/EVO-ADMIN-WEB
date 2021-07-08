import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LoadFilesComponent } from '../load-files/load-files.component';

@Component({
  selector: 'app-get-files',
  templateUrl: './get-files.component.html',
  styleUrls: ['./get-files.component.scss']
})
export class GetFilesComponent implements OnInit {
  @Output() files: EventEmitter<File[] | File> = new EventEmitter();
  @Input() multiple!: boolean;
  @Input() accept!: string;
  @Input() text!: string;
  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
  }

  openDialog(): void{
    this.dialog.open(LoadFilesComponent, {
      disableClose: true,
      width: '800px',
      data: { multiple: this.multiple, accept: this.accept }
    }).afterClosed().subscribe((data: File[] | File) => {
      if(data){
        this.files.emit(data);
      }
    });
  }

}
