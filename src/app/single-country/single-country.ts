import {Component, input} from '@angular/core';

@Component({
  selector: 'app-single-country',
  imports: [],
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
