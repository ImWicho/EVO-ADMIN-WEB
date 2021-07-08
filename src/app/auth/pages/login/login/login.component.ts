import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EMAIL } from '@constants/regex';
import { NotificationService } from '@services/notification.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form!: FormGroup;
  loading = false;
  constructor(private fb: FormBuilder,
              private router: Router,
              private notificationService: NotificationService) { this.onCreateForm(); }

  ngOnInit(): void {
  }

  onLogin(): void{
    this.loading = true;
    setTimeout(() => {
      if (this.form.invalid) { return; }
      if (this.form.get('username')?.value !== 'master@evo.com'){
        this.notificationService.openSnackBar('Datos incorrectos', 3000).subscribe((data) => {

        });
      }else{
        localStorage.setItem('tokenEvo', 'lkasd96821JAKSADP0k@');
        this.router.navigate(['/main/reglas']);
      }
    }, 3000);

  }

  onCreateForm(): void{
    this.form = this.fb.group({
      username: ['', [Validators.required, Validators.pattern(EMAIL)]],
      password: ['', [Validators.required, Validators.minLength(5)]]
    });
  }
}
