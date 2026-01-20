import {Component, input} from '@angular/core';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-single-country',
  imports: [
    RouterLink
  ],
  templateUrl: './single-country.html',
  styleUrl: './single-country.scss',
})
export class SingleCountry {
  flag = input("");
  country = input("");
  population = input("");
  region = input("");
  capital = input("");
}
