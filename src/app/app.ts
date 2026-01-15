import {Component, signal} from '@angular/core';
import {Countries} from './countries/countries';

@Component({
  selector: 'app-root',
  imports: [Countries],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('countries');
}
