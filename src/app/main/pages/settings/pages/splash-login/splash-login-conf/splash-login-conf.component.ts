import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'app/app.reducer';

@Component({
  selector: 'app-splash-login-conf',
  templateUrl: './splash-login-conf.component.html',
  styleUrls: ['./splash-login-conf.component.scss']
})
export class SplashLoginConfComponent implements OnInit {
  isSmall!: boolean;
  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.store.select('main').subscribe((state) => {
      this.isSmall = state.isSmall;
    });
  }

}
