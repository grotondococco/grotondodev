import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  Renderer2,
} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-main-page',
  imports: [],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.css',
})
export class MainPageComponent implements AfterViewInit, OnInit {
  languages = ['it', 'en'];
  language: string = 'en'; // default
  changeLanguage(language: string): void {
    if (this.languages.includes(language)) {
      this.language = language;
      this.router.navigate([language]);
    } else {
      this.language = 'en';
      this.router.navigate(['en']);
    }
  }

  activeSection: string = 'about';
  currentYear: number = new Date().getFullYear();
  constructor(
    private router: Router,
    public activatedRoute: ActivatedRoute,
    private el: ElementRef,
    private renderer: Renderer2
  ) {}
  ngOnInit() {
    this.activatedRoute.data.subscribe((data) => {
      if (data['language']) {
        this.language = data['language'];
      }
    });
  }
  scrollTo(sectionId: string): void {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      this.activeSection = sectionId;
    }
  }

  ngAfterViewInit(): void {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.4, // almeno il 40% visibile
    };

    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          const section = entry.target.getAttribute('data-section');
          if (section) {
            this.activeSection = section;
          }
        }
      }
    }, options);

    const sections = this.el.nativeElement.querySelectorAll('[data-section]');
    sections.forEach((section: Element) => observer.observe(section));
  }
}
