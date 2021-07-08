import { Component, Input, OnInit } from '@angular/core';
import { SidenavService } from '@services/sidenav.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {
  @Input() isSmall: boolean | undefined;
  constructor(
    private sideNavService: SidenavService,
    private router: Router
  ) {
   }

  ngOnInit(): void {
  }

  logOut(): void{
    localStorage.clear();
    this.router.navigate(['/auth/login']);
  }

  toogleSideNav(): void{
    this.sideNavService.toggle$.next();
  }

  toMainView() {
    this.router.navigateByUrl('/main');
  }

}
