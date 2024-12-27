import { Component, OnInit } from "@angular/core";
import { Auth, signInWithPopup, GoogleAuthProvider, signOut, onAuthStateChanged, User } from "@angular/fire/auth";
import { CommonModule } from "@angular/common";
import { NgIf } from "@angular/common";
import { NgbCollapse } from "@ng-bootstrap/ng-bootstrap";
import { RouterLink } from "@angular/router";
import { MatIconModule } from "@angular/material/icon";
import { AngularFireAuthModule } from "@angular/fire/compat/auth";

@Component({
  selector: "app-nav-bar",
  templateUrl: "./nav-bar.component.html",
  styleUrls: ["./nav-bar.component.less"],
  standalone: true,
  imports: [MatIconModule, NgbCollapse, NgIf, RouterLink, CommonModule, AngularFireAuthModule],
})
export class NavBarComponent implements OnInit {
  isCollapsed = true;
  userCollapsed = true;
  user: User | null = null;

  constructor(private auth: Auth) {}

  ngOnInit(): void {
    // Listen to auth state changes
    onAuthStateChanged(this.auth, (user) => {
      this.user = user;
    });
  }

  // Login with Google Auth
  async loginWithRedirect() {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(this.auth, provider);
    } catch (error) {
      console.error("Login failed", error);
    }
  }

  // Logout function
  async logout() {
    try {
      await signOut(this.auth);
    } catch (error) {
      console.error("Logout failed", error);
    }
  }

  // Check if user is authenticated
  get isAuthenticated(): boolean {
    return this.user !== null;
  }
}
