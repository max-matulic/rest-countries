import {Component, inject, OnDestroy, OnInit, signal, WritableSignal} from '@angular/core';
import {CountriesService} from './countries.service';
import {SingleCountry} from '../single-country/single-country';
import {Country} from '../single-country/single-country.model';
import {FormControl, ReactiveFormsModule} from '@angular/forms';
import {debounceTime, Subject, takeUntil} from 'rxjs';
import {LoadingSpinner} from '../loading-spinner/loading-spinner';
import {ErrorMessage} from '../error-message/error-message';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'app-countries',
  imports: [
    SingleCountry,
    ReactiveFormsModule,
    LoadingSpinner,
    ErrorMessage
  ],
  templateUrl: './countries.html',
  styleUrl: './countries.scss',
})
export class Countries implements OnInit, OnDestroy {
  countries: WritableSignal<Country[]> = signal<Country[]>([]);
  allCountries: WritableSignal<Country[]> = signal<Country[]>([]);
  regions: WritableSignal<string[]> = signal<string[]>([]);
  error: WritableSignal<string | null> = signal<string | null>(null);
  loading: WritableSignal<boolean> = signal<boolean>(false);
  search = new FormControl("");
  filter = new FormControl("");
  destroy$ = new Subject<void>();

  private countriesService = inject(CountriesService);

  constructor() {}

  ngOnInit() {
    this.loadCountries();
    this.loadCountriesByRegion();
    this.loadCountriesByName();
  }

  private loadCountries(): void {
    this.loading.set(true);
    this.error.set(null);
    this.countriesService.getCountries().subscribe({
      next: (countries: Country[])=>{
        this.countries.set(countries);
        this.allCountries.set(countries);
        this.regions.set([...new Set(countries.map(country=> country.region))].sort());
      },
      error: (err: HttpErrorResponse)=>{
        this.error.set(err.message);
        this.loading.set(false);
      },
      complete: ()=>{
        this.loading.set(false);
      }
    })
  }

  private loadCountriesByRegion(): void {
    this.filter.valueChanges.pipe(takeUntil(this.destroy$)).subscribe((value)=>{
      if(value && value !== "all") {
        this.loading.set(true);
        this.error.set(null);
        this.countriesService.getCountriesByRegion(value).subscribe({
          next: (countries: Country[])=>{
            this.countries.set(countries);
          },
          error: (err: HttpErrorResponse)=>{
            this.error.set(err.message);
            this.loading.set(false);
          },
          complete: ()=>{
            this.loading.set(false);
          }
        });
      } else {
        this.countries.set(this.allCountries());
      }
    })
  }

  private loadCountriesByName(): void {
    this.search.valueChanges.pipe(debounceTime(800), takeUntil(this.destroy$)).subscribe((value)=>{
      if(value && value !== "") {
        this.loading.set(true);
        this.error.set(null);
        this.countriesService.getCountriesByName(value.trim()).subscribe({
          next: (countries: Country[])=>{
            this.countries.set(countries);
          },
          error: (err: HttpErrorResponse)=>{
            this.error.set(err.message);
            this.loading.set(false);
          },
          complete: ()=>{
            this.loading.set(false);
          }
        });
      } else {
        this.countries.set(this.allCountries());
      }
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
