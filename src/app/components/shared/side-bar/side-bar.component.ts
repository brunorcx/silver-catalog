import { Component, OnInit } from "@angular/core";
import { AuthService } from "../../../core/services/auth.service";
import { User } from "firebase/auth"; // Import User type from Firebase
import { CommonModule } from "@angular/common";
import { RouterLink } from "@angular/router";
import { MatIconModule } from "@angular/material/icon";

@Component({
  selector: "app-side-bar",
  templateUrl: "./side-bar.component.html",
  styleUrls: ["./side-bar.component.less"],
  standalone: true,
  imports: [MatIconModule, RouterLink, CommonModule], // Import required modules
})
export class SideBarComponent implements OnInit {
  isCollapsed = true;
  user: User | null = null; // Default user to null to reflect unauthenticated state

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    // Access the user signal from AuthService, subscribing to changes in user state
    this.authService.user$.subscribe((user) => {
      this.user = user; // Set user when auth state changes
    });
  }

  // Login method using the AuthService's Google login
  loginWithRedirect() {
    this.authService.loginWithGoogle(); // Redirect login method
  }

  // Logout method using the AuthService's logout functionality
  logout() {
    this.authService.logout(); // Logout method
  }

  // Check if the user is authenticated by checking if user is not null
  get isAuthenticated(): boolean {
    return this.user !== null; // True if user is logged in (user exists)
  }
}