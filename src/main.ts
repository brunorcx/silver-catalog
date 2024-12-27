import { bootstrapApplication } from "@angular/platform-browser";
import { provideRouter } from "@angular/router";
import { provideFirebaseApp, initializeApp } from "@angular/fire/app";
import { provideAuth, getAuth } from "@angular/fire/auth";
import { environment } from "./environments/environment";
import { AppComponent } from "./app/app.component";
import { routes } from "./app/app-routing.module";
import { provideHttpClient } from "@angular/common/http";

// Ensure you provide Firebase and Auth services properly here
bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    provideFirebaseApp(() => initializeApp(environment.firebase)), // Global Firebase initialization
    provideAuth(() => getAuth()), // Firebase Auth initialization
  ],
});
