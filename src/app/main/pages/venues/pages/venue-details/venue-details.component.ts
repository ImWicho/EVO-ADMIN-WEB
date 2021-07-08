import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HOURS } from '@constants/constants';
import { Store } from '@ngrx/store';
import { AppState } from 'app/app.reducer';
import { IArea } from 'app/shared/interfaces/iconfig';
import { unsetArea } from 'app/store/actions/areas/areas.actions';
import * as dayjs from 'dayjs';
import { Subscription } from 'rxjs';
import { cards, multipleChart, normalChart } from './data';

@Component({
  selector: 'app-venue-details',
  templateUrl: './venue-details.component.html',
  styleUrls: ['./venue-details.component.scss']
})
export class VenueDetailsComponent implements OnInit, OnDestroy {
  subscription!: Subscription;
  area!: IArea | null;
  minDate: Date;
  maxDate: Date;
  data = cards;
  multi = multipleChart;
  normal = normalChart;
  hours = HOURS;
  labels = [
    'Genero','Escolaridad','Origen', 'Edad'
  ];

  colorScheme = {
    domain: ['#2F6EB8']
  };
  colorScheme2 = {
    domain: ['#2F6EB8', '#FF9F10']
  };

  form!: FormGroup;
  range = false;
  constructor(private store: Store<AppState>,
              private router: Router,
              private fb: FormBuilder) {
    this.buildForm();
    this.minDate = dayjs().subtract(6,'month').toDate();
    this.maxDate = dayjs().toDate();
  }

  ngOnInit(): void {
    this.store.select('spaces').subscribe((data) => {
      this.area = data.area;
      if(!this.area){
        this.router.navigate(['/main/venues']);
      }
    });
  }

  ngOnDestroy(): void{
    this.store.dispatch( unsetArea() );
  }

  buildForm(): void{
    this.form = this.fb.group({
      type: [1, [Validators.required]],
      date1 : ['', [Validators.required]],
      date2: ['', []],
      hour1: ['', [Validators.required]],
      hour2: ['', [Validators.required]],
    });
  }

  test(): void{
    console.log(this.form.value);

  }

  changeType(event: any): void{
    this.range = event.value === 2;

    if(this.range){
      this.form.get('hour1')?.clearValidators();
      this.form.get('hour2')?.clearValidators();
      this.form.get('date2')?.setValidators([Validators.required]);
    }else{
      this.form.get('hour1')?.setValidators([Validators.required]);
      this.form.get('hour2')?.setValidators([Validators.required]);
      this.form.get('date2')?.clearValidators();
    }
    this.form.get('hour1')?.updateValueAndValidity();
    this.form.get('hour2')?.updateValueAndValidity();
    this.form.get('date2')?.updateValueAndValidity();
  }

}
