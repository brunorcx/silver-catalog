import { inject, Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { Auth, user } from "@angular/fire/auth";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class AuthGuard implements CanActivate {
  private auth: Auth = inject(Auth);
  private router: Router = inject(Router);
  private user$ = user(this.auth);

  canActivate(): Observable<boolean> {
    return this.user$.pipe(
      map((user) => {
        if (user) {
          return true; // User is authenticated, allow access
        } else {
          this.router.navigate(["/"]); // If not authenticated, redirect to homepage
          return false;
        }
      })
    );
  }
}
