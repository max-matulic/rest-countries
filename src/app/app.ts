import {Component, signal} from '@angular/core';
import {Countries} from './countries/countries';
import {RouterOutlet} from '@angular/router';
import {Header} from './header/header';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('countries');
}
