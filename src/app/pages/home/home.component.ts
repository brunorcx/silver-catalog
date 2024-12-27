import { Component, OnInit } from "@angular/core";
import { Auth, onAuthStateChanged, User } from "@angular/fire/auth";
import { CommonModule } from "@angular/common";
import { LoadingComponent } from "../../components/shared/loading/loading.component";
import { ProductListComponent } from "../../components/product-list/product-list.component";
import { MainBannerComponent } from "../../components/main-banner/main-banner.component";
@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.less"],
  standalone: true,
  imports: [CommonModule, LoadingComponent, MainBannerComponent, ProductListComponent], // Include all components used in the template
})
export class HomeComponent implements OnInit {
  user: User | null = null;
  isLoading: boolean = true;

  constructor(private auth: Auth) {}

  ngOnInit(): void {
    onAuthStateChanged(this.auth, (user) => {
      this.user = user;
      this.isLoading = false; // Stop loading after auth state change
    });
  }

  get isAuthenticated(): boolean {
    return this.user !== null;
  }
}
