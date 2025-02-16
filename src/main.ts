import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { headerConfig } from './header/header.config';
import { HeaderComponent } from './header/header.component';
import { footerConfig } from './footer/footer.config';
import { FooterComponent } from './footer/footer.component';

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));

bootstrapApplication(HeaderComponent, headerConfig)
  .catch((err) => console.error(err));

bootstrapApplication(FooterComponent, footerConfig)
  .catch((err) => console.error(err));
