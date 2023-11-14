import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { devTools } from '@ngneat/elf-devtools';
import { AppModule } from './app/app.module';
devTools();

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
