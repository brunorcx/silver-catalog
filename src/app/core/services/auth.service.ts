import { Injectable, inject } from "@angular/core";
import { Auth, signInWithPopup, GoogleAuthProvider, signOut, onAuthStateChanged, User } from "@angular/fire/auth";
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private auth = inject(Auth);

  // Use BehaviorSubject to track the user state
  private userSubject: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(null);

  constructor() {
    // Listen to auth state change and update the user in BehaviorSubject
    onAuthStateChanged(this.auth, (user) => {
      this.userSubject.next(user); // .next() is used to set the value
    });
  }

  // Login method using Google
  async loginWithGoogle(): Promise<void> {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(this.auth, provider);
      this.userSubject.next(result.user); // Set the logged-in user
    } catch (error) {
      console.error("Google login failed:", error);
    }
  }

  // Logout method
  async logout(): Promise<void> {
    try {
      await signOut(this.auth);
      this.userSubject.next(null); // Reset the user value on logout
    } catch (error) {
      console.error("Logout failed:", error);
    }
  }

  // Expose the user observable to components
  get user$() {
    return this.userSubject.asObservable(); // Return the observable
  }
}
