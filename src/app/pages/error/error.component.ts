import { AsyncPipe, NgIf } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Auth } from "@angular/fire/auth";
import { FirebaseError } from "firebase/app"; // Correct import for FirebaseError
import { signInWithEmailAndPassword } from "firebase/auth"; // Import Firebase authentication function
import { Observable } from "rxjs";

@Component({
  selector: "app-error",
  templateUrl: "./error.component.html",
  standalone: true,
  imports: [AsyncPipe, NgIf],
})
export class ErrorComponent implements OnInit {
  public error$: Observable<string | null> = new Observable<string | null>();

  constructor(private auth: Auth, private router: Router) {}

  ngOnInit() {
    // Auth state listener
    this.auth.onAuthStateChanged((user) => {
      if (!user) {
        this.error$ = new Observable<string>((observer) => {
          observer.next("No user authenticated. Please sign in!");
          observer.complete();
        });
      }
    });

    // Example of handling Firebase sign-in errors
    signInWithEmailAndPassword(this.auth, "someUserEmail@example.com", "incorrectPassword")
      .then(() => {
        // Handle success - user logged in
        console.log("User logged in!");
      })
      .catch((error: FirebaseError) => {
        // Catch sign-in errors and display them in the UI
        this.error$ = new Observable<string>((observer) => {
          observer.next(error.message);
          observer.complete();
        });
      });

    // Redirect after a few seconds
    setTimeout(() => {
      this.router.navigateByUrl("/");
    }, 5000);
  }
}
