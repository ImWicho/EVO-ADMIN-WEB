import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { AfterContentInit, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EMAIL, NUMBER } from '@constants/regex';
import { NotificationService } from '@services/notification.service';
import { FacebookLoginProvider, GoogleLoginProvider, SocialAuthService, SocialUser } from 'angularx-social-login';
import { Field, IPreview } from 'app/preview-splash/models/ipreview';
import { PreviewSplashService } from 'app/preview-splash/services/preview-splash.service';

@Component({
  selector: 'app-preview-splash',
  templateUrl: './preview-splash.component.html',
  styleUrls: ['./preview-splash.component.scss']
})
export class PreviewSplashComponent implements OnInit, AfterContentInit {
  splash!: IPreview;
  form!: FormGroup;
  isLoading = true;
  responsive = false;
  loading = false;

  baseGrantUrl = '';
  userContinueUrl = '';

  user!: SocialUser ;
  constructor(private service: PreviewSplashService,
              private route: ActivatedRoute,
              private notiSvc: NotificationService,
              public breakpointObserver: BreakpointObserver,
              private authService: SocialAuthService,
              private router: Router) { }

  ngOnInit(): void {
    this.getInfoSplash();
    this.getParamsForMeraki();
    this.listenAuth();
  }

  listenAuth(): void{
    this.authService.authState.subscribe((user) => {
      if(user){
        console.log(user);

        this.user = user;
        this.form.get('nombre')?.setValue(user.name);
        this.form.get('correo')?.setValue(user.email);
      }
    });
  }

  getParamsForMeraki(): void {

    this.route.queryParams
      .subscribe(params => {
        this.userContinueUrl = params.user_continue_url  || '';
        this.baseGrantUrl = params.base_grant_url  || '';
        }
      );
  }


  ngAfterContentInit(): void{
    this.breakpointObserver.observe([
      Breakpoints.Small,
      Breakpoints.XSmall
    ]).subscribe((data: any) => {
      this.responsive = data.matches;
    });
  }

  getInfoSplash(): void{
    this.service.getSplash(this.route.snapshot.params.id).subscribe((data) => {
      this.splash = data[0];
      this.splash.fields.forEach((x) => {
        x.alias = x.field_name;
        x.field_name = x.field_name.replace(/ /g, '_').toLowerCase();
      });
      this.addInputsToForm();
      this.isLoading = false;

      this.router.navigate([], {
        relativeTo: this.route,
        queryParams: {
          duration: this.splash.navigation_time ? +this.splash.navigation_time * 24 * 3600 : 3600
        },
        queryParamsHandling: 'merge',
      });
    });
  }

  addInputsToForm(): void{
    const controls: { [key: string]: any } = {};
    this.splash.fields?.forEach(
      (element: Field) => controls[element.field_name] = new FormControl('', this.addValidators(element)));
    this.form = new FormGroup(controls);
  }

  addValidators(element: Field): any{
    const validatorsArray: Array<Validators> = [];

    if(element.is_required){
      validatorsArray.push(Validators.required);
    }

    if(element.field_type){
      switch(element.field_type){
        case 'email':
          validatorsArray.push(Validators.pattern(EMAIL));
        break;
        case 'number':
          validatorsArray.push(Validators.pattern(NUMBER));
        break;
      }
    }

    return validatorsArray;
  }

  loginFacebook(): void{
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID);
  }

  loginGoogle(): void{
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }

  async login(): Promise<void>{
    this.loading = !this.loading;
    const data = {
      id_splash : this.route.snapshot.params.id,
      data: {
        ...this.form.value
      },
      token : this.user ? this.user.authToken : null,
      provder : this.user ? this.user.provider : null,
      macAddress : this.route.snapshot.queryParams.client_mac
    };

    this.service.sendData(data).subscribe(async (res) => {
      const response = await this.notiSvc.showNotification(
        {icon: 'check',
        title : 'Has iniciado sesión correctamente.',
        text : 'Ya puedes navegar en internet.',
        hideCancel: true}
      );
      this.loading = !this.loading;

      if(response){
        this.grantAccess();
      }
    });
  }

  grantAccess(): void {
    let loginUrl = this.baseGrantUrl;
    if (this.userContinueUrl !== '') {
      loginUrl  = this.baseGrantUrl + '?continue_url=' + this.userContinueUrl;
    }
    console.log('Logging in... ' ,loginUrl);
    window.open(loginUrl,'_self');
  }

}
