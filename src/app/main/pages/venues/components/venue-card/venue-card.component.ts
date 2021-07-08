import {Component, Input, OnInit} from '@angular/core';
import { trigger, state, style, transition, animate, keyframes } from '@angular/animations';
import {IArea} from '../../../../../shared/interfaces/iconfig';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'app/app.reducer';
import { saveArea } from 'app/store/actions/areas/areas.actions';

@Component({
  selector: 'app-venue-card',
  templateUrl: './venue-card.component.html',
  styleUrls: ['./venue-card.component.scss'],
  animations: [
    // Animations
    trigger('toggle',[
      state('collapsed', style({ height : '0px', minHeight: '0'})),
      state('expanded', style({ height : '*' })),
      transition('collapsed <=> expanded', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)'))
    ])
  ]
})
export class VenueCardComponent implements OnInit {
  @Input() area!: IArea;
  @Input() info!: any;
  isExpanded = false;

  constructor(private router: Router,
              private store: Store<AppState>) { }

  ngOnInit(): void {
  }

  toggle(): void{
    this.isExpanded = !this.isExpanded;
  }

  redirectAndSave(area: IArea): void{
    this.store.dispatch( saveArea({ data: area }) );
    this.router.navigate(['/main/venues/detail', area.id_data]);
  }

}
