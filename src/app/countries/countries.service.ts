import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {catchError, map, Observable, of, shareReplay, startWith} from 'rxjs';
import {Country} from '../single-country/single-country.model';


@Injectable({providedIn: "root"})
export class CountriesService {
  private readonly http= inject(HttpClient);
  private readonly apiUrl = "https://restcountries.com/v2/all?fields=flag,name,population,region,capital";

  getCountries(): Observable<Country[]>{
    return this.http.get<Country[]>(this.apiUrl);
  }

  getCountriesByRegion(region: string): Observable<Country[]>{
    return this.http.get<Country[]>(`https://restcountries.com/v2/region/${region}`);
  }

  getCountriesByName(countryName: string): Observable<Country[]>{
    return this.http.get<Country[]>(`https://restcountries.com/v2/name/${countryName}`);
  }
}
