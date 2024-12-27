import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { NgbDropdown, NgbDropdownMenu, NgbDropdownToggle } from "@ng-bootstrap/ng-bootstrap";
import { RouterLink } from "@angular/router";
import { MatIconModule } from "@angular/material/icon";
import { Auth, signInWithPopup, GoogleAuthProvider, signOut, onAuthStateChanged, User } from "@angular/fire/auth";

@Component({
  selector: "app-side-bar",
  imports: [MatIconModule, NgbDropdownToggle, NgbDropdownMenu, NgbDropdown, RouterLink, CommonModule],
  templateUrl: "./side-bar.component.html",
  styleUrls: ["./side-bar.component.less"],
  standalone: true,
})
export class SideBarComponent {
  isCollapsed = true;

  user: User | null = null;

  constructor(private auth: Auth) {
    onAuthStateChanged(this.auth, (user) => {
      this.user = user;
    });
  }

  async loginWithRedirect() {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(this.auth, provider);
    } catch (error) {
      console.error("Login failed", error);
    }
  }

  async logout() {
    try {
      await signOut(this.auth);
    } catch (error) {
      console.error("Logout failed", error);
    }
  }

  get isAuthenticated(): boolean {
    return this.user !== null;
  }
}
