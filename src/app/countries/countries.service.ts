import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, shareReplay} from 'rxjs';
import {Country} from '../single-country/single-country.model';


@Injectable({providedIn: "root"})
export class CountriesService {
http = inject(HttpClient);

  countries$: Observable<Country[]> = this.http.get<Country[]>("https://restcountries.com/v2/all?fields=flag,name,population,region,capital").pipe(shareReplay(1))

}
