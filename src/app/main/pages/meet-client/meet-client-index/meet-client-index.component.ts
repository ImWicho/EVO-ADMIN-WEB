import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-meet-client-index',
  templateUrl: './meet-client-index.component.html',
  styleUrls: ['./meet-client-index.component.scss']
})
export class MeetClientIndexComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  search: FormControl = new FormControl('');
  loading = false;
  data = false;
  displayedColumns: string[] = ['name', 'email', 'gender', 'age',
                                'room', 'reason'];
  dataSource!: MatTableDataSource<any>;

  constructor() { }

  ngOnInit(): void {
    this.listener();
    this.setData();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  setData(): void{
    this.dataSource = new MatTableDataSource();
    this.dataSource.data = [
      { name: 'Luis', email: 'luis@gmail.com', gender: 'Masculino', age : 21, room: 'MH-NY 402', reason: 'Placer' },
      { name: 'Luis', email: 'luis@gmail.com', gender: 'Masculino', age : 21, room: 'MH-NY 402', reason: 'Placer' },
      { name: 'Luis', email: 'luis@gmail.com', gender: 'Masculino', age : 21, room: 'MH-NY 402', reason: 'Placer' },
      { name: 'Luis', email: 'luis@gmail.com', gender: 'Masculino', age : 21, room: 'MH-NY 402', reason: 'Placer' },
      { name: 'Luis', email: 'luis@gmail.com', gender: 'Masculino', age : 21, room: 'MH-NY 402', reason: 'Placer' }
    ];
    this.dataSource.paginator = this.paginator;
    this.sort = this.sort;
  }

  listener(): void{
    this.search.valueChanges.subscribe((x) => {
      if(x.length < 5){
        return;
      }

      this.loading = true;
      this.data = false;

      setTimeout(() => {
        this.loading = false;
        this.data = true;
      }, 3000);
    });
  }

}
