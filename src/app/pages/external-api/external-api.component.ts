import { NgIf } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { Auth } from "@angular/fire/auth"; // Firebase Auth
import { ApiService } from "src/app/api.service";

@Component({
  selector: "app-external-api",
  templateUrl: "./external-api.component.html",
  styleUrls: ["./external-api.component.less"],
  standalone: true,
  imports: [NgIf],
})
export class ExternalApiComponent implements OnInit {
  responseJson = "";
  audience: string | undefined;
  hasApiError = false;
  productsList = "";
  user: any; // For storing user data

  constructor(private api: ApiService, private auth: Auth) {}

  ngOnInit(): void {
    this.auth.onAuthStateChanged((user) => {
      if (user) {
        this.user = user;
        // Assuming user is authenticated and you fetch audience from Firestore or other methods
        this.audience = "your-audience-value"; // Replace with actual logic to set the audience
      }
    });
  }

  getProducts() {
    if (!this.audience) {
      console.log("Audience is not set.");
      return;
    }

    // Make the API call to fetch products
    this.api.getProducts().subscribe({
      next: (res) => {
        this.hasApiError = false;
        this.productsList = JSON.stringify(res, null, 2).trim();
      },
      error: (err) => {
        this.hasApiError = true;
        console.error("Error fetching products:", err);
      },
    });
  }
}
