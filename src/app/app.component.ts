import { Component, OnInit } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { BreakpointObserver, Breakpoints } from "@angular/cdk/layout";

import { NavBarComponent } from "./components/shared/nav-bar/nav-bar.component";
import { FooterComponent } from "./components/shared/footer/footer.component";
import { SideBarComponent } from "./components/shared/side-bar/side-bar.component";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.less"],
  standalone: true,
  imports: [RouterOutlet, NavBarComponent, FooterComponent, SideBarComponent],
})
export class AppComponent implements OnInit {
  isSmallScreen: boolean;

  constructor(private breackpointObserver: BreakpointObserver) {}
  
  ngOnInit() {
    this.breackpointObserver.observe([Breakpoints.Handset]).subscribe(result => {
      this.isSmallScreen = result.matches;
      console.log('isSmallScreen:', this.isSmallScreen);
    });
  }
}

