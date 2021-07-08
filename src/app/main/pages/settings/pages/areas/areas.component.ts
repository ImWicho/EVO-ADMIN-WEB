import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NUMBER } from '@constants/regex';
import { FileServiceService } from '@services/file-service.service';
import { NotificationService } from '@services/notification.service';
import { IDevice, INetwork, IOrganization } from 'app/shared/interfaces/iconfig';
import { ConfigService } from '../../services/config.service';

@Component({
  selector: 'app-areas',
  templateUrl: './areas.component.html',
  styleUrls: ['./areas.component.scss']
})
export class AreasComponent implements OnInit {
  @ViewChild(FormGroupDirective) formGroupDirective!: FormGroupDirective;
  form!: FormGroup;
  configForm!: FormGroup;
  files: File[] = [];
  organizations: IOrganization[] = [];
  networks: INetwork[] = [];
  areas: any[] = [];
  imgbase64!: string | undefined;
  constructor(private fb: FormBuilder,
              private service: ConfigService,
              private notiSvc: NotificationService,
              private router: Router,
              private fileService: FileServiceService) { this.buildForm(); }

  ngOnInit(): void {
    this.getOrganizations();
    this.configForm.get('green_limit')?.valueChanges.subscribe((max) => {
      if(this.configForm.get('green_limit')?.valid){
        this.configForm
        .get('yellow_limit')?.setValidators([Validators.required, Validators.min(+max +1), Validators.pattern(NUMBER),Validators.max(100)]);
        this.configForm.get('yellow_limit')?.updateValueAndValidity();

        this.configForm.get('yellow_limit2')?.setValue(+max+1);
      }
    });

    this.configForm.get('yellow_limit')?.valueChanges.subscribe((max) => {
      if(this.configForm.get('yellow_limit')?.valid){
        this.configForm
        .get('red_limit')?.setValidators([Validators.required, Validators.min(+max +1),Validators.pattern(NUMBER),Validators.max(100)]);
        this.configForm.get('red_limit')?.updateValueAndValidity();

        if(max > 0){
          this.configForm.get('red_limit2')?.setValue(+max+1);
        }
      }
    });
  }

  getOrganizations(): void{
    this.service.getOrganizations().subscribe((data) => {
      this.organizations = data;
    });
  }

  getNetworks(): void{
    this.service.getNetworks(this.form.get('organization')?.value).subscribe((data) => {
      this.networks = [];
      this.form.get('network')?.setValue('');
      this.form.get('network')?.markAsUntouched();
      this.areas = [];
      this.form.get('area')?.setValue('');
      this.form.get('area')?.markAsUntouched();
      this.networks = data;
    });
  }

  async setArea(): Promise<void>{
    this.files = [];
    const data = this.form.get('area')?.value;
    this.configForm.get('green_limit2')?.setValue(0);
    this.configForm.get('yellow_limit2')?.setValue(null);
    // this.configForm.get('red_limit2')?.setValue(null);

    this.configForm.get('max_capacity')?.setValue(data.max_capacity);
    this.configForm.get('green_limit')?.setValue(data.green_limit);
    this.configForm.get('yellow_limit')?.setValue(data.yellow_limit);
    // this.configForm.get('red_limit')?.setValue(data.red_limit);

    if(data.area_image){
      this.files.push(await this.fileService.convertBase64ToFile(data.area_image, 'area_image'));
      this.imgbase64 = data.area_image;
    }else{
      this.imgbase64 = undefined;
    }
  }

  getAreas(): void{
    this.service.getAreasByNetwork(this.form.get('network')?.value).subscribe((data) => {
      this.areas = [];
      this.form.get('area')?.setValue('');
      this.form.get('area')?.markAsUntouched();
      this.areas = data;
    });
  }

  async onSave(): Promise<void>{
    const data = {
      id_data : this.form.get('area')?.value.id_data,
      ...this.configForm.value,
      area_image : null
    };

    this.service.updateArea(data).subscribe(async (res) => {

      if(this.files.length > 0){
        const area_image = await this.fileService.convertFileToBase64(this.files[0]);

        await this.service.saveImagetoArea({ area_image }, res.id_data);
      }

      await this.notiSvc.showNotification(
        {
          icon: 'check',
          title : 'El área se configuró correctamente.',
          text : '',
          hideCancel: true
        }
      );

      this.resetAll();
    });

  }

  resetAll(): void{
    this.formGroupDirective.resetForm();
    this.form.reset();
    this.configForm.reset();
    this.files = [];
    this.imgbase64 = undefined;
    this.areas = [];
    this.networks = [];
  }

  buildForm(): void{
    this.form = this.fb.group({
      organization: ['', [Validators.required]],
      network: ['', [Validators.required]],
      area: ['', [Validators.required]]
    });

    this.configForm = this.fb.group({
      max_capacity: ['', [Validators.required, Validators.min(1), Validators.pattern(NUMBER)]],
      green_limit: ['', [Validators.required, Validators.min(1), Validators.max(100), Validators.pattern(NUMBER)]],
      yellow_limit: ['', [Validators.required, Validators.min(1), Validators.pattern(NUMBER),Validators.max(100)]],
      red_limit: [100, [Validators.required, Validators.min(1),Validators.pattern(NUMBER),Validators.max(100)]],
      green_limit2: [0, []],
      yellow_limit2: ['', []],
      red_limit2: ['', []],
    });
  }

  async setFiles(event: any): Promise<void>{
    const files: File[] = event;
    this.files = files;

    if(this.files.length <= 0){
      this.imgbase64 = undefined;
    }else{
      this.imgbase64 = await this.fileService.convertFileToBase64(this.files[0]);
    }
  }

}
