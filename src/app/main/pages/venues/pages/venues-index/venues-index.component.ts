import {Component, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConfigService } from 'app/main/pages/settings/services/config.service';
import {IArea, INetwork, IOrganization} from 'app/shared/interfaces/iconfig';
import { VenueService } from '../../services/venue.service';

@Component({
  selector: 'app-venues-index',
  templateUrl: './venues-index.component.html',
  styleUrls: ['./venues-index.component.scss']
})
export class VenuesIndexComponent implements OnInit {

  form!: FormGroup;
  loading = false;

  organizations: IOrganization[] = [];
  networks: INetwork[] = [];
  areas: IArea[] = [];
  networkSelected = {} as INetwork;
  areaSelected!: IArea | undefined;
  infoArea!: any;
  constructor(
    private fb: FormBuilder,
    private service: ConfigService,
    private venueService: VenueService) {
    this.buildForm();
  }

  ngOnInit(): void {
    this.getOrganizations();
  }

  onSubmit(): void{
    this.loading = true;
    setTimeout(() => {
      this.areaSelected = this.form.get('area')?.value;
      this.venueService.getInfoArea(2).subscribe((data) => {
        this.infoArea = data;
        this.loading = false;
      });
    }, 2000);
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
      this.areaSelected = undefined;
    });
  }

  getAreas(): void {
    this.networkSelected = this.form.get('network')?.value;
    this.service.getAreasByNetwork(this.networkSelected.id_network).subscribe((areas) => {
      this.areas = [];
      this.form.get('area')?.setValue('');
      this.form.get('area')?.markAsUntouched();
      this.areas = areas;
      this.areaSelected = undefined;
    });
  }

  buildForm(): void{
    this.form = this.fb.group({
      organization: ['', [Validators.required]],
      network: ['', [Validators.required]],
      area: ['', [Validators.required]]
    });
  }

}
