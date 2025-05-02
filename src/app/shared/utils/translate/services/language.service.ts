import { inject, Injectable, signal } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
// import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  // cookieService = inject(CookieService);
  translate = inject(TranslateService);
  currentLang = signal('');

  changeLanguage(language: string) {
    this.translate.use(language);
    // this.cookieService.set('language', language, 365, '/');
    this.currentLang.set(language);

    this.translate.setDefaultLang(language);
  }
}
