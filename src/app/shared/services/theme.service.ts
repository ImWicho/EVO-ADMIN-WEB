import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private renderer!: Renderer2;
  private colorTheme!: string;

  constructor(private renderFactory: RendererFactory2) {
    this.renderer = renderFactory.createRenderer(null, null);
   }

   initTheme(): void{
     this.gerColorTheme();
     this.renderer.addClass(document.body, this.colorTheme);
   }

   updateTheme(theme: 'dark-mode' | 'light-mode'): void{
    this.setColorTheme(theme);
    const previousTheme = (theme === 'dark-mode' ? 'light-mode' : 'dark-mode');
    this.renderer.removeClass(document.body, previousTheme);
    this.renderer.addClass(document.body, theme);
   }

   isDarkMode(): boolean{
     return this.colorTheme === 'dark-mode';
   }

   private setColorTheme(theme: string): void{
    this.colorTheme = theme;
    localStorage.setItem('theme', this.colorTheme);
   }

   private gerColorTheme(): void{
     const theme: string | null = localStorage.getItem('theme');
     if (theme){
       this.colorTheme = theme;
     }else{
       this.colorTheme = 'light-mode';
     }
   }
}
