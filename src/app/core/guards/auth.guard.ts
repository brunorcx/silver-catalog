import { inject, Injectable } from "@angular/core";
import { CanActivate, Router, ActivatedRouteSnapshot } from "@angular/router";
import { Auth, user } from "@angular/fire/auth";
import { Observable, of } from "rxjs";
import { switchMap, map } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class AuthGuard implements CanActivate {
  private auth = inject(Auth);
  private router = inject(Router);

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    const requiredRole = route.data["role"]; // Get the required role from route data

    return user(this.auth).pipe(
      switchMap((firebaseUser) => {
        if (!firebaseUser) {
          this.router.navigate(["/"]); // Redirect if not authenticated
          return of(false);
        }

        return firebaseUser.getIdTokenResult().then((idTokenResult) => {
          const claims = idTokenResult.claims;

          // If no specific role is required, just check authentication
          if (!requiredRole) {
            return true;
          }

          // Check if the user's role matches the required role
          if ((claims[requiredRole] as string).includes("admin")) {
            return true;
          } else {
            this.router.navigate(["/forbidden"]); // Redirect if not authorized
            return false;
          }
        });
      })
    );
  }
}
