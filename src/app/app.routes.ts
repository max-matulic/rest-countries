import { Routes } from '@angular/router';
import {Countries} from './countries/countries';
import {CountryDetail} from './country-detail/country-detail';

export const routes: Routes = [
  {
    path: "",
    component: Countries
  },
  {
    path: "countries/:country",
    component: CountryDetail
  },
  {
    path: "countries",
    redirectTo: ""
  }
];
