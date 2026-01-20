import {Component, inject, signal, WritableSignal} from '@angular/core';
import {CountriesService} from './countries.service';
import {SingleCountry} from '../single-country/single-country';
import {Country} from '../single-country/single-country.model';
import {FormControl, ReactiveFormsModule} from '@angular/forms';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {debounceTime} from 'rxjs';

@Component({
  selector: 'app-countries',
  imports: [
    SingleCountry,
    ReactiveFormsModule
  ],
  templateUrl: './countries.html',
  styleUrl: './countries.scss',
})
export class Countries {
  countries: WritableSignal<Country[]> = signal<Country[]>([]);
  allCountries: WritableSignal<Country[]> = signal<Country[]>([]);
  regions: WritableSignal<string[]> = signal<string[]>([]);
  error: WritableSignal<string | null> = signal<string | null>(null);
  loading: WritableSignal<boolean> = signal<boolean>(false);
  search = new FormControl("");
  filter = new FormControl("");
  private countriesService = inject(CountriesService);

  constructor() {
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
      error: ()=>{
        this.error.set("Failed to load countries.");
        this.loading.set(false);
      },
      complete: ()=>{
        this.loading.set(false);
      }
    })
  }

  private loadCountriesByRegion(): void {
    this.filter.valueChanges.pipe(takeUntilDestroyed()).subscribe((value)=>{
      if(value && value !== "all") {
        this.loading.set(true);
        this.error.set(null);
        this.countriesService.getCountriesByRegion(value).subscribe({
          next: (countries: Country[])=>{
            this.countries.set(countries);
          },
          error: ()=>{
            this.error.set("Failed to load countries.");
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
    this.search.valueChanges.pipe(debounceTime(800), takeUntilDestroyed()).subscribe((value)=>{
      if(value && value !== "") {
        this.loading.set(true);
        this.error.set(null);
        this.countriesService.getCountriesByName(value.trim()).subscribe({
          next: (countries: Country[])=>{
            this.countries.set(countries);
          },
          error: ()=>{
            this.error.set("Failed to load countries.");
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
}
