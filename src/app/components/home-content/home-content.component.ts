import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faLink } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-home-content',
  templateUrl: './home-content.component.html',
  styleUrls: ['./home-content.component.less'],
  standalone: true,
  imports: [FontAwesomeModule],
})
export class HomeContentComponent {
  faLink = faLink;
}
