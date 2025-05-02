import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { LanguageService } from '../../services/language.service';

@Component({
  selector: 'app-language-selector',
  imports: [],
  templateUrl: './LanguageSelector.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LanguageSelectorComponent {
  languageService = inject(LanguageService);

  currentLanguage = this.languageService.currentLang;

  languages = signal([
    { code: 'en', flag: '🇺🇸' },
    { code: 'es', flag: '🇪🇸' },
    { code: 'fr', flag: '🇫🇷' },
    { code: 'it', flag: '🇮🇹' },
  ]);

  changeLanguage(event: Event) {
    const target = event.target as HTMLSelectElement;
    const selectedLanguage = target.value;
    this.languageService.changeLanguage(selectedLanguage);
  }
}
