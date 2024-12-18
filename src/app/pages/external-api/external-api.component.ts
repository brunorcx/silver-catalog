import { NgClass, NgIf } from "@angular/common";
import { Component } from "@angular/core";
import { AuthClientConfig } from "@auth0/auth0-angular";
import { HighlightModule } from "ngx-highlightjs";
import { ApiService } from "src/app/api.service";

@Component({
  selector: "app-external-api",
  templateUrl: "./external-api.component.html",
  styleUrls: ["./external-api.component.less"],
  standalone: true,
  imports: [HighlightModule, NgClass, NgIf],
})
export class ExternalApiComponent {
  responseJson: string;
  audience: string | undefined;
  hasApiError = false;
  productsList: string;

  constructor(private api: ApiService, private configFactory: AuthClientConfig) {
    this.audience = this.configFactory.get()?.authorizationParams.audience;
  }

  getProducts() {
    this.api.getProducts().subscribe({
      next: (res) => {
        this.hasApiError = false;
        this.productsList = JSON.stringify(res, null, 2).trim();
      },
      error: () => (this.hasApiError = true),
    });
  }
}
