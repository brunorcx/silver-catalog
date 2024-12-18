import { Component } from "@angular/core";
import { AuthService } from "@auth0/auth0-angular";
import { HomeContentComponent } from "./../../components/home-content/home-content.component";
import { LoadingComponent } from "../../components/shared/loading/loading.component";
import { AsyncPipe, NgIf } from "@angular/common";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.less"],
  standalone: true,
  imports: [HomeContentComponent, LoadingComponent, AsyncPipe, NgIf],
})
export class HomeComponent {
  constructor(public auth: AuthService) {}
}
