import { bootstrapApplication } from "@angular/platform-browser";
import { provideRouter } from "@angular/router";
import { provideFirebaseApp, initializeApp } from "@angular/fire/app";
import { provideAuth, getAuth } from "@angular/fire/auth";
import { environment } from "./environments/environment";
import { AppComponent } from "./app/app.component";
import { routes } from "./app/app-routing.module";
import { provideHttpClient } from "@angular/common/http";
import { provideAnimations } from "@angular/platform-browser/animations";
import { provideToastr } from "ngx-toastr";

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    provideAnimations(), // Required animations providers
    provideToastr(), // Toastr providers
    provideFirebaseApp(() => initializeApp(environment.firebase)), // Global Firebase initialization
    provideAuth(() => getAuth()), // Firebase Auth initialization
  ],
});
