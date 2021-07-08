import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { ConfigService } from 'app/main/pages/settings/services/config.service';
import { IArea, INetwork, IOrganization } from 'app/shared/interfaces/iconfig';

@Component({
  selector: 'app-users-online-index',
  templateUrl: './users-online-index.component.html',
  styleUrls: ['./users-online-index.component.scss']
})
export class UsersOnlineIndexComponent implements OnInit {
  @ViewChild(FormGroupDirective) formGroupDirective!: FormGroupDirective;
  form!: FormGroup;
  loading = false;

  organizations: IOrganization[] = [];
  networks: INetwork[] = [];
  areas: IArea[] = [];
  networkSelected = {} as INetwork;
  table = 0;
  constructor(private fb: FormBuilder,
              private service: ConfigService) { this.buildForm(); }

  ngOnInit(): void {
    this.getOrganizations();
  }

  onSubmit(): void{
    this.loading = true;
    setTimeout(() => {
      if(this.form.get('area')?.value){
        this.table = 1;
      }else{
        this.table = 2;
      }
      this.loading = false;
      this.formGroupDirective.resetForm();
      this.form.reset();
    }, 3000);

  }

  getOrganizations(): void{
    this.service.getOrganizations().subscribe((data) => {
      this.organizations = data;
    });
  }

  clearAreas(): void {
    this.areas = [];
    this.networkSelected = {} as INetwork;
  }

  getNetworks(): void{
    this.service.getNetworks(this.form.get('organization')?.value).subscribe((data) => {
      this.networks = [];
      this.form.get('network')?.setValue('');
      this.form.get('network')?.markAsUntouched();
      this.clearAreas();
      this.form.get('area')?.setValue('');
      this.form.get('area')?.markAsUntouched();
      this.networks = data;
    });
  }

  getAreas(): void {
    this.networkSelected = this.form.get('network')?.value;
    this.service.getAreasByNetwork(this.networkSelected.id_network).subscribe((areas) => {
      this.areas = [];
      this.form.get('area')?.setValue('');
      this.form.get('area')?.markAsUntouched();
      this.areas = areas;
    });
  }

  buildForm(): void{
    this.form = this.fb.group({
      organization: ['', [Validators.required]],
      network: ['', [Validators.required]],
      area: [null, []]
    });
  }

}
