import { AfterContentInit, AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { SidenavService } from '@services/sidenav.service';
import { MatDrawer } from '@angular/material/sidenav';
import { Store } from '@ngrx/store';
import { AppState } from 'app/app.reducer';
import { isSmall } from 'app/store/actions/app/main.actions';



@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit, AfterContentInit {
  @ViewChild('matDrawer') drawer!: MatDrawer;
  public isSmall = false;

  constructor(public breakpointObserver: BreakpointObserver,
              private sidenavService: SidenavService,
              private store: Store<AppState>){}

  ngOnInit(): void{
    this.sidenavService.toggle$.subscribe(() => this.drawer.toggle());
  }

  ngAfterContentInit(): void{
    this.breakpointObserver.observe([
      Breakpoints.Small,
      Breakpoints.XSmall
    ]).subscribe((data: any) => {
      this.isSmall = data.matches;
      this.store.dispatch( isSmall({ flag: this.isSmall }));
      if(!this.isSmall && this.drawer){
        this.drawer.close();
      }
    });
  }

}
