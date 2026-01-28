import { Routes } from '@angular/router';
import {Countries} from './countries/countries';
import {CountryDetail} from './country-detail/country-detail';
import {PageNotFound} from './page-not-found/page-not-found';

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
  },
  {
    path: "**",
    component: PageNotFound
  }
];
