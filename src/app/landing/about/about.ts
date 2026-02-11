import { Component, afterNextRender, inject, NgZone, OnDestroy } from '@angular/core';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TechDisplayer } from './tech-displayer/tech-displayer';
import { DetailsDisplayer } from './details-displayer/details-displayer';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [TechDisplayer, DetailsDisplayer],
  templateUrl: './about.html',
  styleUrl: './about.scss',
})
export class About implements OnDestroy {
  private ngZone = inject(NgZone);
  private mm = gsap.matchMedia();

  public constructor() {
    afterNextRender(() => {
      requestAnimationFrame(() => {
        this.ngZone.runOutsideAngular(() => {
          this.initAnimations();
        });
      });
    });
  }

  private initAnimations(): void {
  gsap.registerPlugin(ScrollTrigger);

  const details = gsap.utils.toArray<HTMLElement>(".details:not(:first-child)");
  const images = gsap.utils.toArray<HTMLElement>(".image:not(:first-child)");
  const allImages = gsap.utils.toArray<HTMLElement>(".image");

  this.mm.add({
    isDesktop: "(min-width: 1024px)",
    isMobile: "(max-width: 1023px)",
    reduceMotion: "(prefers-reduced-motion: reduce)"
  }, (context) => {

    // 🔒 on sauvegarde la position AVANT toute modif GSAP
    const savedScroll = window.scrollY;

    const { isDesktop, isMobile, reduceMotion } = context.conditions as any;

    if (isDesktop && !reduceMotion) {
      gsap.set(images, { yPercent: 101, autoAlpha: 1 });

      ScrollTrigger.create({
        trigger: ".container",
        start: "top top",
        end: "bottom bottom",
        pin: ".right"
      });

      details.forEach((detail, index) => {
        const headline = detail.querySelector("h2");
        if (!headline) return;

        ScrollTrigger.create({
          trigger: headline,
          start: "top 80%",
          end: "top 50%",
          scrub: 1,
          animation: gsap.timeline()
            .to(images[index], { yPercent: 0 })
            .set(allImages[index], { autoAlpha: 0 })
        });
      });
    }

    if (isMobile || reduceMotion) {
      gsap.set([images, allImages], { clearProps: "all" });
    }

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        window.scrollTo({
          top: savedScroll,
          behavior: 'auto'
        });
      });
    });
  });
}


  public ngOnDestroy() {
    this.mm.revert();
  }
}