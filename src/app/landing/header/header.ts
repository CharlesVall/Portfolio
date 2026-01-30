import { AfterViewInit, Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { Navbar } from './navbar/navbar';
import gsap from 'gsap';

@Component({
  selector: 'app-header',
  imports: [Navbar],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header implements AfterViewInit {
  private isScrolled = false;
  @ViewChild('header', {static: true}) header!: ElementRef;

  @HostListener('window:scroll')
  public onScroll(): void {
    const trigger = window.innerHeight / 2;
    this.isScrolled = window.scrollY > trigger;
  }

  public ngAfterViewInit(): void {
    gsap.from(this.header.nativeElement, {
      y:-250,
      opacity: 0,
      duration: 1,
      ease: 'power3.out'
    })
  }
}
