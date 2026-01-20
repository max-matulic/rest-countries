import { Component, inject, signal, WritableSignal} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {CountriesService} from '../countries/countries.service';
import {Country} from '../single-country/single-country.model';
import {Observable} from 'rxjs';
import {AsyncPipe} from '@angular/common';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-country-detail',
  imports: [
    AsyncPipe
  ],
  templateUrl: './country-detail.html',
  styleUrl: './country-detail.scss',
})
export class CountryDetail {
  countryName:WritableSignal<string> = signal("");
  countryData$: Observable<Country[]>;
  private activatedRoute = inject(ActivatedRoute);
  private countriesService = inject(CountriesService);

  constructor() {
    this.activatedRoute.params.pipe(takeUntilDestroyed()).subscribe((params)=>{
      console.log(params);
      this.countryName.set(params['country']);
    });
    this.countryData$ = this.countriesService.getCountriesByName(this.countryName());
  }
}
