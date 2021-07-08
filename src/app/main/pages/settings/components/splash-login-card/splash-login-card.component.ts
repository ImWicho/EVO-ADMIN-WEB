import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { NotificationService } from '@services/notification.service';
import { AppState } from 'app/app.reducer';
import { Subscription } from 'rxjs';
import { ConfigService } from '../../services/config.service';

@Component({
  selector: 'app-splash-login-card',
  templateUrl: './splash-login-card.component.html',
  styleUrls: ['./splash-login-card.component.scss']
})
export class SplashLoginCardComponent implements OnInit {
  @Input() config!: any;
  @Output() refresh = new EventEmitter<boolean>();
  subscription!: Subscription;
  splashes!: any[];
  constructor(private notiSvc: NotificationService,
              private service: ConfigService,
              private store: Store<AppState>,
              private router: Router) { }

  ngOnInit(): void {
    this.subscription = this.store.select('splashConf').subscribe((data) => {
      this.splashes = data.splashes;
    });
  }

  goToSplash(id_splash: number): void{
      const url = this.router.serializeUrl(
        this.router.createUrlTree([`/splash/preview/${id_splash}`])
      );
      window.open(url, '_blank');
  }

  publishSplash(id: number, is_published: number): void{
    let flag = false;

    this.splashes.forEach((x) => {
      if(x.id_splash !== id && x.is_published && !is_published){
        this.notiSvc.showNotification(
          {
            icon: 'alert',
            title: 'Ya cuentas con un splash login publicado.',
            text: 'Por favor desactiva el splash login publicado.',
            hideCancel: true
          }
        );

        flag = true;
      }
    });

    if(!flag){
      const data = {
        id,
        is_published : !is_published
      };

      this.service.publishSplash(data).subscribe(() => {
        this.notiSvc.showNotification(
          {
            icon: 'check',
            title: !is_published ? 'El splash login se ha publicado correctamente.' : 'El splash login se quitó correctamente.',
            text: '',
            hideCancel: true
          }
        );
        this.refresh.emit(true);
      });
    }
  }

  async onDelete(): Promise<void>{
    const res = await this.notiSvc.showNotification(
      {
        icon: 'alert',
        title: '¿Estás seguro de desactivar el splash login?',
        text: 'Al desactivarlo, no se podra recuperar la información',
        hideCancel: false
      }
    );

    if(res){
      this.service.desactivateSplashLogin(
        this.config.id_splash
      ).subscribe(async (data) => {
        await this.notiSvc.showNotification(
          {
            icon: 'check',
            title: 'Splash login desactivado correctamente',
            text: '',
            hideCancel: true
          }
        );

        this.refresh.emit(true);
      });
    }
  }

}
