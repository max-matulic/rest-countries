import {Component, inject} from '@angular/core';
import {Header} from '../header/header';
import {CountriesService} from './countries.service';
import {AsyncPipe} from '@angular/common';
import {map, Observable} from 'rxjs';
import {SingleCountry} from '../single-country/single-country';
import {Country} from '../single-country/single-country.model';

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
  countries$: Observable<Country[]>;
  regions$: Observable<string[]>;

  constructor() {
    this.countries$ = this.countriesService.countries$;
    this.regions$ = this.countries$
      .pipe(
        map(countries => countries.map(country => country.region)),
        map(regions => [...new Set(regions)].sort()),
      );
  }

}
