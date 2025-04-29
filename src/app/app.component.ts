import { Component, inject } from '@angular/core';
// import { TranslateService } from '@ngx-translate/core';
import { RouterOutlet } from '@angular/router';
import { ButtonModule } from 'primeng/button';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet,ButtonModule],
  templateUrl: "./app.component.html",
})
export class AppComponent {
  // private readonly translate = inject(TranslateService);

  // constructor() {
  //   this.translate.setDefaultLang('es');
  //   this.translate.use('es');
  // }
}
