import { Routes } from "@angular/router";
import { HomeComponent } from "./pages/home/home.component";
import { ProfileComponent } from "./pages/profile/profile.component";
import { ExternalApiComponent } from "./pages/external-api/external-api.component";
import { ErrorComponent } from "./pages/error/error.component";
import { ProductManagementComponent } from "./pages/product-management/product-management.component";
import { redirectUnauthorizedTo, redirectLoggedInTo } from "@angular/fire/auth-guard";
import { AngularFireAuthGuard } from "@angular/fire/compat/auth-guard";

// Define redirect strategies
const redirectUnauthorizedToHome = () => redirectUnauthorizedTo([""]);
const redirectLoggedInToProfile = () => redirectLoggedInTo(["profile"]);
const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(["auth", "/"]); // Redirecting to the login page

export const routes: Routes = [
  {
    path: "",
    component: HomeComponent,
    pathMatch: "full",
  },
  {
    path: "profile",
    component: ProfileComponent,
    canActivate: [AngularFireAuthGuard], // Apply auth guard
    data: { authGuardPipe: redirectUnauthorizedToLogin }, // Use redirection if not authenticated
  },
  {
    path: "external-api",
    component: ExternalApiComponent,
    canActivate: [AngularFireAuthGuard], // Apply auth guard
    data: { authGuardPipe: redirectUnauthorizedToLogin }, // Use redirection if not authenticated
  },
  {
    path: "product-management",
    component: ProductManagementComponent,
    canActivate: [AngularFireAuthGuard], // Apply auth guard
    data: { authGuardPipe: redirectUnauthorizedToLogin }, // Use redirection if not authenticated
  },
  {
    path: "error",
    component: ErrorComponent,
  },
  {
    path: "**",
    redirectTo: "",
    pathMatch: "full",
  },
];
