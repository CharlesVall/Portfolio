import { afterNextRender, AfterViewInit, Component, ElementRef, HostListener, inject, NgZone, signal, viewChild, ViewChild } from '@angular/core';
import { Navbar } from './navbar/navbar';
import gsap from 'gsap';

@Component({
  selector: 'app-header',
  imports: [Navbar],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  public readonly isScrolled = signal(false);
  private readonly header = viewChild.required<ElementRef<HTMLElement>>("header");

  private readonly ngZone = inject(NgZone);

  public constructor() {
    afterNextRender(() => {
      this.initAnimations();
    })
  }

  private initAnimations() {
    this.ngZone.runOutsideAngular(() => {
      gsap.from(this.header().nativeElement, {
        y: -250,
        opacity: 0,
        duration: 1,
        ease: 'power3.out'
      });
    });
  }

  @HostListener('window:scroll')
  public onScroll(): void {
    const trigger = window.innerHeight / 2;
    const newState = window.scrollY > trigger;
    
    if (this.isScrolled() !== newState) {
      this.isScrolled.set(newState);
    }
  }
}