import { Component, OnInit } from "@angular/core";
import { Auth } from "@angular/fire/auth"; // Firebase Auth
import { User } from "firebase/auth"; // Firebase User type
import { Observable } from "rxjs";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.less"],
  standalone: true,
})
export class ProfileComponent implements OnInit {
  profileJson: string | null = null;
  user$: Observable<User | null>; // Observable to watch user changes

  constructor(private auth: Auth) {
    this.user$ = new Observable((observer) => {
      this.auth.onAuthStateChanged((user) => observer.next(user));
    });
  }

  ngOnInit(): void {
    // Automatically subscribe to the user data for display
    this.user$.subscribe((user) => {
      if (user) {
        // If user exists, stringifying the user object for display
        this.profileJson = JSON.stringify(user, null, 2);
      }
    });
  }
}
