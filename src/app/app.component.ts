import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './components/ui/navbar/navbar.component';
import { LoadingComponent } from './components/ui/loading/loading.component';
import { NotificationComponent } from "./components/ui/notification/notification.component";
import { FooterComponent } from "./components/ui/footer/footer.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent, LoadingComponent, LoadingComponent, NotificationComponent, FooterComponent],
  template: `
    <app-navbar></app-navbar>
    <app-loading></app-loading>
    <app-notification></app-notification>
    <router-outlet></router-outlet>
    <app-footer></app-footer>
  `,
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'superhero-app';
}
