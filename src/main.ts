import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { AppComponent } from './app/app.component';
import { routes } from './app/app.routes';  // Correct path to app.routes.ts

bootstrapApplication(AppComponent, {
  providers: [provideRouter(routes)],  // Add routing provider here
}).catch((err) => console.error(err));
