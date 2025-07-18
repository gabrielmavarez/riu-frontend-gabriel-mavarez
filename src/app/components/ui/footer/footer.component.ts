import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCopyright } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-footer',
  imports: [FontAwesomeModule],
  templateUrl:'./footer.component.html',
  styleUrl: './footer.component.scss'

})
export class FooterComponent {
  faCopyright = faCopyright;
}
