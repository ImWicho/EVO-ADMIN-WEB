import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'app/app.reducer';
import { splashes } from 'app/store/actions/splash/splash-login.actions';
import { ConfigService } from '../../services/config.service';

@Component({
  selector: 'app-splash-login',
  templateUrl: './splash-login.component.html',
  styleUrls: ['./splash-login.component.scss']
})
export class SplashLoginComponent implements OnInit, OnDestroy {
  splashes = [];
  constructor(private service: ConfigService,
              private store: Store<AppState>) { }

  ngOnInit(): void {
    this.getSplashes();
  }

  ngOnDestroy(): void{
    this.store.dispatch(splashes({ data: [] }));
  }

  getSplashes(): void{
    this.service.getSplashesLogin().subscribe((data) => {
      this.splashes = data;
      this.filterSplashes();
    });
  }

  filterSplashes(): void{
    const copy: any[] = [];
    this.splashes.forEach((x: any) => {
      const { background_image, logo_image, ...data } = x;
      copy.push(data);

    });

    this.store.dispatch(splashes({ data: copy }));
  }

}
