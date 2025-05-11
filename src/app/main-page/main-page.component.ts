import { AfterViewInit, Component, ElementRef, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-main-page',
  imports: [],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.css',
})
export class MainPageComponent implements AfterViewInit {
  activeSection: string = 'about';
  currentYear: number = new Date().getFullYear();
  constructor(private el: ElementRef, private renderer: Renderer2) {}

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
      threshold: 0.4, // almeno il 50% visibile
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
