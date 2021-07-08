import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Input() title!: string;
  @Input() desc!: string;
  @Input() image!: string;
  constructor() { }

  ngOnInit(): void {
  }

}
