import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-users-online-table-toggle',
  templateUrl: './users-online-table-toggle.component.html',
  styleUrls: ['./users-online-table-toggle.component.scss'],
  animations: [
    // Animations
    trigger('toggle',[
      state('collapsed', style({ height : '0px', minHeight: '0'})),
      state('expanded', style({ height : '*' })),
      transition('collapsed <=> expanded', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)'))
    ])
  ]
})
export class UsersOnlineTableToggleComponent implements OnInit {
  isExpanded = false;
  constructor() { }

  ngOnInit(): void {
  }

  toggle(): void{
    this.isExpanded = !this.isExpanded;
  }

}
