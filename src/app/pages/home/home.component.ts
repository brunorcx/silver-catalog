import { Component, OnInit } from "@angular/core";
import { AuthService } from "../../core/services/auth.service";
import { User } from "firebase/auth"; // Import User type from Firebase
import { CommonModule } from "@angular/common";
import { LoadingComponent } from "../../components/shared/loading/loading.component";
import { ProductListComponent } from "../../components/product-list/product-list.component";
import { MainBannerComponent } from "../../components/main-banner/main-banner.component";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.less"],
  standalone: true,
  imports: [CommonModule, LoadingComponent, MainBannerComponent, ProductListComponent],
})
export class HomeComponent implements OnInit {
  user: User | null = null; // Set user to null as default
  isLoading = true;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    // Subscribe to the user observable from the AuthService
    this.authService.user$.subscribe({
      next: (user) => {
        this.user = user; // Set the user state
        this.isLoading = false; // Set loading to false once the user is loaded
      },
      error: (err) => {
        console.error("Error fetching user data:", err);
        this.isLoading = false; // Stop loading if there's an error
      },
    });
  }

  // Getter to check if the user is authenticated
  get isAuthenticated(): boolean {
    return this.user !== null; // If user is not null, they're authenticated
  }
}
