import { Injectable, signal, WritableSignal} from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DarkMode {
  private body: HTMLBodyElement | null = document.querySelector("body");
  private readonly siteMode: string | null = "";
  isDarkMode: WritableSignal<boolean> = signal<boolean>(false);

  constructor() {
    this.siteMode = localStorage.getItem("mode");
    this.body?.classList.add(this.siteMode ?? "");
    this.isDarkMode.set(this.siteMode === "dark-mode");
  }

  toggleDarkMode(): void {
    if (this.body?.classList.contains("light-mode")) {
      localStorage.setItem("mode", "dark-mode");
      this.body?.classList.replace("light-mode", "dark-mode")
      this.isDarkMode.set(true);

    } else {
      localStorage.setItem("mode", "light-mode");
      this.body?.classList.replace("dark-mode", "light-mode")
      this.isDarkMode.set(false);
    }
  }
}
