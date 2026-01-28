import {Component, inject} from '@angular/core';
import {DarkMode} from '../services/dark-mode';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [
    RouterLink
  ],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  protected darkModeService = inject(DarkMode);
}
