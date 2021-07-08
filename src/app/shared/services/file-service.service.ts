import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FileServiceService {

  constructor() { }

  convertFileToBase64(file: File): Promise<any>{
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => {
        reject(error);
      };
    });
  }

  convertBase64ToFile(filex: string, name: string): Promise<File> {
    const url = filex;
    const typex = url.substring(url.indexOf(':') + 1, url.indexOf(';base64'));
    return new Promise((resolve, reject) => {
      fetch(url)
      .then((res) => res.blob())
      .then((blob) => {
        const file = new File([blob], name, { type: typex });
        resolve(file);
      })
      .catch((error) => {
        reject(error);
      });
    });
  }

}
