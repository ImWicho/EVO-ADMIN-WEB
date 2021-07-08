import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { NotificationService } from '@services/notification.service';
import { IDevice, INetwork, IOrganization } from 'app/shared/interfaces/iconfig';
import { ConfigService } from '../../services/config.service';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {NewAreaDialogComponent} from '../../components/new-area-dialog/new-area-dialog.component';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { Store } from '@ngrx/store';
import { AppState } from 'app/app.reducer';
import { saveAreas } from 'app/store/actions/areas/areas.actions';

@Component({
  selector: 'app-spaces',
  templateUrl: './spaces.component.html',
  styleUrls: ['./spaces.component.scss']
})
export class SpacesComponent implements OnInit, OnDestroy {
  companyControl: FormControl = new FormControl('' , [Validators.required]);
  companyControlInput: FormControl = new FormControl('' , [Validators.required]);

  networkControl: FormControl = new FormControl('' , [Validators.required]);
  networkControlInput: FormControl = new FormControl('' , [Validators.required]);

  area1: FormControl = new FormControl('' , [Validators.required]);
  area2: FormControl = new FormControl('' , [Validators.required]);
  areaControl: FormControl = new FormControl('' , [Validators.required]);

  organizations: IOrganization[] = [];
  networks: INetwork[] = [];
  devices: IDevice[] = [];
  areas: any[] = [];

  constructor(private service: ConfigService,
              private notiSvc: NotificationService,
              private store: Store<AppState>) {}

  ngOnInit(): void {
    this.getOrganizations();
  }

  ngOnDestroy(): void{
    this.store.dispatch( saveAreas({ data: [] }) );
  }

  addDeviceToArea(): void{
    const data = {
      id_area : this.areaControl.value,
      devices: [this.area1.value]
    };

    this.service.addDevicesToArea(data).subscribe((res) => {
      this.notiSvc.showNotification(
        {icon: 'check',
        title : 'El dispositivo se asoció correctamente.',
        text : '',
        hideCancel: true}
      );

      this.getDevices();
      this.getAreasByNetwork();
    },(error: any) => console.log( 'Error', error ));

  }

  addDevicesToArea(): void{
    const data = {
      id_area : this.areaControl.value,
      devices: this.area2.value
    };
    this.service.addDevicesToArea(data).subscribe((res) => {
      this.notiSvc.showNotification(
        {icon: 'check',
        title : 'Los dispositivos se asociaron correctamente.',
        text : '',
        hideCancel: true}
      );

      this.getDevices();
      this.getAreasByNetwork();
    },(error: any) => console.log( 'Error', error ));

  }

  updateOrganization(): void{
    const data = {
      ...this.companyControl.value,
      organization_rename : this.companyControlInput.value
    };

    this.service.updateOrganization(data).subscribe(() => {
      this.notiSvc.showNotification(
        {icon: 'check',
        title : 'La organización se actualizó correctamente-',
        text : '',
        hideCancel: true}
      );
      this.getOrganizations();
      this.clearOrganizations();
      this.clearNetworks();
      this.clearDevices();
    });
  }

  updateNetwork(): void{
    const data = {
      ...this.networkControl.value,
      network_rename: this.networkControlInput.value
    };

    this.service.updateNetwork(data).subscribe(() => {
      this.notiSvc.showNotification(
        {icon: 'check',
        title : 'El venue se actualizó correctamente.',
        text : '',
        hideCancel: true}
        );
        this.clearNetworks();
        this.clearDevices();
        this.getNetworks();
      });
  }

  getOrganizations(): void{
    this.service.getOrganizations().subscribe((data) => {
      this.clearOrganizations();
      this.organizations = data;
    });
  }

  getNetworks(): void{
    this.service.getNetworks(this.companyControl.value.meraki_id).subscribe((data) => {
      this.clearNetworks();
      this.networks = data;

      this.clearAreas();
      this.clearDevices();
    });
  }

  getDevices(): void{
    if(this.networkControl.invalid){ return; }
    this.service.getDevices(this.networkControl.value.id_network).subscribe((data) => {
      this.clearDevices();
      this.devices = data;
    });

    this.getAreasByNetwork();
  }

  getAreasByNetwork(): void{
    if(this.networkControl.invalid){ return; }
    this.service.getAreasByNetwork(this.networkControl.value.id_network).subscribe((data) => {
      this.clearAreas();
      this.areas = data;
      this.store.dispatch( saveAreas({ data: this.areas }) );
    });
  }

  // updateDevice(): void{
  //   const data = {
  //     ...this.deviceControl.value,
  //     area_name : this.deviceControlInput.value
  //   };

  //   this.service.updateDevice(data).subscribe(() => {
  //     this.notiSvc.showNotification(
  //       {icon: 'check',
  //       title : 'Actualizado correctamente.',
  //       text : 'La dispositivo se actualizó correctamente',
  //       hideCancel: true}
  //     );
  //     this.clearDevices();
  //     this.getDevices();
  //   });
  // }

  clearOrganizations(): void{
    this.organizations = [];
    this.companyControl.setValue('');
    this.companyControl.markAsUntouched();
    this.companyControlInput.setValue('');
    this.companyControlInput.markAsUntouched();
  }

  clearNetworks(): void{
    this.networks = [];
    this.networkControl.setValue('');
    this.networkControl.markAsUntouched();
    this.networkControlInput.setValue('');
    this.networkControlInput.markAsUntouched();
  }

  clearDevices(): void{
    this.devices = [];
    this.area1.setValue('');
    this.area1.markAsUntouched();

    this.area2.setValue('');
    this.area2.markAsUntouched();
  }

  clearAreas(): void{
    this.areas = [];
    this.areaControl.setValue('');
    this.areaControl.markAsUntouched();
    this.store.dispatch( saveAreas({ data: this.areas }) );
  }

}
