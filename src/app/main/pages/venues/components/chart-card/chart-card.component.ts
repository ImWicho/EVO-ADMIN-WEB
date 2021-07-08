import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-chart-card',
  templateUrl: './chart-card.component.html',
  styleUrls: ['./chart-card.component.scss']
})
export class ChartCardComponent implements OnInit {
  @Input() data!: any;
  @Input() label!: any;
  colorScheme = {
    domain: ['#2F6EB8']
  };

  constructor() {}

  ngOnInit(): void {
  }

}
