import {
  afterNextRender,
  Component,
  ElementRef,
  NgZone,
  inject,
  viewChild,
  effect,
} from '@angular/core';
import gsap from 'gsap';
import { Navbar } from './navbar/navbar';
import { HeaderService } from '@core/services/header-service/header-service';
import { CSSPlugin } from 'gsap/CSSPlugin';


@Component({
  selector: 'app-header',
  imports: [Navbar],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  private readonly ngZone = inject(NgZone);
  private readonly headerService = inject(HeaderService);
  
  private readonly header =
    viewChild.required<ElementRef<HTMLElement>>('header');

  constructor() {
    effect(() => {
      const visible = this.headerService.isHeaderVisible();

      if (visible) {
        this.ngZone.runOutsideAngular(() => {
          this.animateShow();
        });
      } else {
        this.ngZone.runOutsideAngular(() => {
          this.animateHide();
        });
      }
    });
    
    afterNextRender(() => {
      gsap.registerPlugin(CSSPlugin);
      this.headerService.showHeader();
    });
  }

  private animateShow(): void {
    gsap.fromTo(
      this.header().nativeElement,
      { y: -250, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: 'power3.out', overwrite: 'auto' }
    );
  }

  private animateHide(): void {
    gsap.to(this.header().nativeElement, {
      y: -250,
      opacity: 0,
      duration: 0.5,
      ease: 'power3.in',
      overwrite: 'auto'
    });
  }
}
