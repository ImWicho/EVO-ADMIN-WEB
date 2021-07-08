import { Injectable } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { icons } from '@constants/icons';

@Injectable({
  providedIn: 'root'
})
export class IconService {

  constructor(matIconRegistry: MatIconRegistry, domSanitizer: DomSanitizer) {
    matIconRegistry.addSvgIconSet(domSanitizer.bypassSecurityTrustResourceUrl('../../../assets/icons/mdi.svg'));

    icons.forEach(icon => {
      matIconRegistry.addSvgIcon(icon, domSanitizer.bypassSecurityTrustResourceUrl(`../../../assets/icons/${icon}.svg`));
    });
   }
}
