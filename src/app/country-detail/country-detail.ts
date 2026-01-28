import { Component, inject, OnDestroy, OnInit, signal, WritableSignal} from '@angular/core';
import {ActivatedRoute, RouterLink} from '@angular/router';
import {CountriesService} from '../countries/countries.service';
import {Country} from '../single-country/single-country.model';
import {LoadingSpinner} from '../loading-spinner/loading-spinner';
import {HttpErrorResponse} from '@angular/common/http';
import {ErrorMessage} from '../error-message/error-message';
import {map, Observable, shareReplay, Subject, takeUntil} from 'rxjs';
import {AsyncPipe} from '@angular/common';
import {DarkMode} from '../services/dark-mode';

@Component({
  selector: 'app-country-detail',
  imports: [
    LoadingSpinner,
    ErrorMessage,
    AsyncPipe,
    RouterLink,
  ],
  templateUrl: './country-detail.html',
  styleUrl: './country-detail.scss',
})
export class CountryDetail implements OnInit, OnDestroy{
  countryParam:WritableSignal<string | null> = signal("");
  singleCountry: WritableSignal<Country | null> = signal(null);
  currencies: WritableSignal<string> = signal("");
  languages: WritableSignal<string> = signal("");
  error: WritableSignal<string | null> = signal(null);
  loading: WritableSignal<boolean> = signal(false);
  borderCountriesObs$: Observable<string[]> = new Observable();
  destroy$ = new Subject<void>();

  private activatedRoute = inject(ActivatedRoute);
  private countriesService = inject(CountriesService);
  protected darkModeService = inject(DarkMode)

  constructor() {}

  ngOnInit() {
    this.activatedRoute.params.pipe(takeUntil(this.destroy$)).subscribe((params)=>{
      this.countryParam.set(params['country']);
        this.getSingleCountryData();
    });
  }

  private getSingleCountryData(): void {
    this.loading.set(true);
    this.error.set(null);

      this.countriesService.getSingleCountry(this.countryParam()).pipe(takeUntil(this.destroy$)).subscribe({
        next: (country: Country) => {
          this.singleCountry.set(country);
          const currencies = country.currencies.map(currency => currency.name).join(", ");
          const languages = country.languages.map(language => language.name).join(", ");
          this.currencies.set(currencies);
          this.languages.set(languages);

          this.borderCountriesObs$ = this.countriesService.getBorderCountries(this.singleCountry()?.borders).pipe(map(borderCountries => borderCountries.map(borderCountry=> borderCountry.name)),shareReplay(1));
        },
        error: (err: HttpErrorResponse) => {
          this.error.set(err.message);
          this.loading.set(false);
        },
        complete: ()=>{
          this.loading.set(false);
        }
      })
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
