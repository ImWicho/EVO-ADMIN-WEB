import { AfterContentInit, AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { SidenavService } from '@services/sidenav.service';
import { MatDrawer } from '@angular/material/sidenav';
import { Store } from '@ngrx/store';
import { AppState } from 'app/app.reducer';
import { isSmall } from 'app/store/actions/app/main.actions';
import {Router} from "@angular/router";



@Component({
  selector: 'app-main',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent {

  constructor(private router: Router) {}

  goToVenues() {
    this.router.navigateByUrl('/main/venues');
  }

}
