import {Component, inject} from '@angular/core';
import {Header} from '../header/header';
import {CountriesService} from './countries.service';
import {AsyncPipe} from '@angular/common';
import {Observable} from 'rxjs';
import {SingleCountry} from '../single-country/single-country';

@Component({
  selector: 'app-countries',
  imports: [
    Header,
    AsyncPipe,
    SingleCountry
  ],
  templateUrl: './countries.html',
  styleUrl: './countries.scss',
})
export class Countries {
  private countriesService = inject(CountriesService);
  countries$: Observable<any>;

  constructor() {
    this.countries$ = this.countriesService.getCountries();
  }
}
