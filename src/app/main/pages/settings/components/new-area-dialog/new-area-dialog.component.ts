import { Component, Inject, OnInit } from '@angular/core';
import {ConfigService} from '../../services/config.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NotificationService} from '@services/notification.service';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { INetwork, IOrganization } from 'app/shared/interfaces/iconfig';


@Component({
  selector: 'app-new-area-dialog',
  templateUrl: './new-area-dialog.component.html',
  styleUrls: ['./new-area-dialog.component.scss']
})
export class NewAreaDialogComponent implements OnInit {
  form!: FormGroup;
  organizations: IOrganization[] = [];
  networks: INetwork[] = [];
  loading = false;
  constructor(private service: ConfigService,
              private fb: FormBuilder,
              private notificationService: NotificationService,
              public dialogRef: MatDialogRef<NewAreaDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
              this.buildForm();
            }

  ngOnInit(): void {
    this.getOrganizations();

    if(this.data){
      this.setArea();
    }
  }

  setArea(): void{
    this.form.get('organization')?.clearValidators();
    this.form.get('organization')?.updateValueAndValidity();
    this.form.get('id_network')?.clearValidators();
    this.form.get('id_network')?.updateValueAndValidity();

    this.form.get('area_name')?.setValue(this.data.area_name);
  }

  updateArea(): void{
    this.loading = true;
    const data = {
      ...this.data,
      area_name : this.form.get('area_name')?.value
    };

    this.service.updateArea(data).subscribe(async (res) => {
      await this.notificationService.showNotification(
        {
          icon: 'check',
          title : 'Área actualizada correctamente.',
          text : '',
          hideCancel: true
        }
      );
      this.loading = false;
      this.dialogRef.close(true);
    }, (error) => {
      console.log('Error', error);
    });

  }

  buildForm(): void {
    this.form = this.fb.group({
      area_name: ['', [Validators.required]],
      organization: ['', [Validators.required]],
      id_network: ['', [Validators.required]]
    });
  }

  storeNewArea() {
    this.loading = true;
    this.service.saveNewArea({...this.form.value, max_capacity: 0}).subscribe(async (res) => {
      await this.notificationService.showNotification(
        {
          icon: 'check',
          title : 'Área creada correctamente.',
          text : '',
          hideCancel: true
        }
      );
      this.loading = false;
      this.dialogRef.close(true);
    }, (error) => {
      console.log('Error', error);
    });
  }

  getOrganizations(): void{
    this.service.getOrganizations().subscribe((data) => {
      this.clearOrganizations();
      this.organizations = data;
    });
  }

  getNetworks(): void{
    this.service.getNetworks(this.form.get('organization')?.value.meraki_id).subscribe((data) => {
      this.clearNetworks();
      this.networks = data;
    });
  }


  clearOrganizations(): void{
    this.organizations = [];
    this.form.get('organization')?.setValue('');
    this.form.get('organization')?.markAsUntouched();
  }

  clearNetworks(): void{
    this.networks = [];
    this.form.get('id_network')?.setValue('');
    this.form.get('id_network')?.markAsUntouched();
  }
}
