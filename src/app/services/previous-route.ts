import {inject, Injectable, signal, WritableSignal} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';
import {filter} from 'rxjs';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root',
})
export class PreviousRoute {
  currentRoute: WritableSignal<string> = signal("");
  previousRoute: WritableSignal<string> = signal("");
  router = inject(Router);

  constructor() {
    this.router.events.pipe(filter(events => events instanceof NavigationEnd), takeUntilDestroyed()).subscribe(event => {
      this.previousRoute.set(this.currentRoute());
      this.currentRoute.set(event.url);
    })
  }
}
