import { Component, inject, signal, WritableSignal} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {CountriesService} from '../countries/countries.service';
import {Country} from '../single-country/single-country.model';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {map, Observable, shareReplay} from 'rxjs';
import {AsyncPipe} from '@angular/common';
import {LoadingSpinner} from '../loading-spinner/loading-spinner';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'app-country-detail',
  imports: [
    AsyncPipe,
    LoadingSpinner
  ],
  templateUrl: './country-detail.html',
  styleUrl: './country-detail.scss',
})
export class CountryDetail {
  countryParam:WritableSignal<string> = signal("");
  countryData$: Observable<Country>;
  currencyData$: Observable<any>;
  languagesData$: Observable<any>;
  private activatedRoute = inject(ActivatedRoute);
  private countriesService = inject(CountriesService);

  constructor() {
    this.activatedRoute.params.pipe(takeUntilDestroyed()).subscribe((params)=>{
      this.countryParam.set(params['country']);
    });

    this.countryData$ = this.countriesService.getSingleCountry(this.countryParam()).pipe(shareReplay(1));

    this.countryData$.subscribe({
      error: (err: HttpErrorResponse)=>{
        console.log(err);
      }
    })

    this.currencyData$ = this.countryData$.pipe(map(country => country.currencies.map(currency => currency.name).join(", ")));

    this.languagesData$ = this.countryData$.pipe(map(country => country.languages.map(language => language.name).join(", ")))
  }
}
