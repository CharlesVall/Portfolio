import { afterNextRender, Component, DestroyRef, ElementRef, inject, input, NgZone, Renderer2, viewChild } from '@angular/core';
import { MagicResizeService } from '@core/services/magic-resize-service/magic-resize-service';
import { fromEvent } from 'rxjs';

@Component({
  selector: 'app-custom-cursor',
  standalone: true,
  templateUrl: './custom-cursor.html',
  styleUrls: ['./custom-cursor.scss'],
})
export class CustomCursor {
  private readonly magicResizeService = inject(MagicResizeService);
  protected readonly magicColor = this.magicResizeService.magicColor;
  private readonly MOBILE_BREAKPOINT = 780;

  private readonly outer = viewChild<ElementRef<HTMLDivElement>>('outer');
  private readonly inner = viewChild<ElementRef<HTMLDivElement>>('inner');

  private readonly ngZone = inject(NgZone);
  private readonly renderer = inject(Renderer2);
  private readonly destroyRef = inject(DestroyRef);

  public readonly color = input('216, 112, 54');
  public readonly innerScale = input(3);

  private targetX = 0;
  private targetY = 0;

  private outerX = 0;
  private outerY = 0;
  private innerX = 0;
  private innerY = 0;

  public constructor() {
    afterNextRender(() => {
      this.ngZone.runOutsideAngular(() => {
        const moveSub = fromEvent<MouseEvent>(window, 'mousemove')
          .subscribe(e => this.onMouseMove(e));

        this.animate();

        this.destroyRef.onDestroy(() => moveSub.unsubscribe());
      });
    });
  }

  private onMouseMove(e: MouseEvent) {
    this.targetX = e.clientX;
    this.targetY = e.clientY;
  }

  private animate() {
    const outerEl = this.outer()?.nativeElement;
    const innerEl = this.inner()?.nativeElement;
    if (!outerEl || !innerEl) return;

    this.outerX += (this.targetX - this.outerX) / 3;
    this.outerY += (this.targetY - this.outerY) / 3;

    this.renderer.setStyle(outerEl, 'left', `${this.outerX}px`);
    this.renderer.setStyle(outerEl, 'top', `${this.outerY}px`);

    this.innerX += (this.targetX - this.innerX) / 2.2;
    this.innerY += (this.targetY - this.innerY) / 2.2;

    this.renderer.setStyle(innerEl, 'left', `${this.innerX}px`);
    this.renderer.setStyle(innerEl, 'top', `${this.innerY}px`);

    requestAnimationFrame(() => this.animate());
  }
}
