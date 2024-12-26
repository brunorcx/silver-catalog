import { Component } from "@angular/core";
import { AuthService } from "@auth0/auth0-angular";
import { LoadingComponent } from "../../components/shared/loading/loading.component";
import { AsyncPipe, NgIf } from "@angular/common";
import { ProductListComponent } from "../../components/product-list/product-list.component";
import { MainBannerComponent } from "../../components/main-banner/main-banner.component";

@Component({
    selector: "app-home",
    templateUrl: "./home.component.html",
    styleUrls: ["./home.component.less"],
    imports: [LoadingComponent, AsyncPipe, NgIf, ProductListComponent, MainBannerComponent]
})
export class HomeComponent {
  constructor(public auth: AuthService) {}
}
