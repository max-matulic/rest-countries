import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header implements OnInit {
  body: HTMLBodyElement | null = document.querySelector("body");
  siteMode: string | null = "";
  isDarkMode!: boolean;

  ngOnInit() {
    this.siteMode = localStorage.getItem("mode");
    this.body?.classList.add(this.siteMode ?? "");
    this.isDarkMode = this.siteMode === "dark-mode";
  }

  protected toggleDarkMode() {
    if (this.body?.classList.contains("light-mode")) {
      localStorage.setItem("mode", "dark-mode");
      this.body?.classList.replace("light-mode", "dark-mode")
      this.isDarkMode = true;

    } else {
      localStorage.setItem("mode", "light-mode");
      this.body?.classList.replace("dark-mode", "light-mode")
      this.isDarkMode = false;
    }
  }
}
