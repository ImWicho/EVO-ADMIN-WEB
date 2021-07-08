import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-load-files',
  templateUrl: './load-files.component.html',
  styleUrls: ['./load-files.component.scss']
})
export class LoadFilesComponent implements OnInit {
  @ViewChild('input', {static: false}) input!: ElementRef;
  files: File[] = [];
  constructor(private dialog: MatDialogRef<LoadFilesComponent>,
              @Inject(MAT_DIALOG_DATA) public data: { multiple: boolean; accept: string }) { }

  ngOnInit(): void {
  }

  getFiles(event: any): void{
    const filesLoad: File[] = event.target.files;
    for(const file of filesLoad){
      this.files.push(file);
    }
    this.input.nativeElement.value = '';
    this.dialog.close(this.files);
  }

}
