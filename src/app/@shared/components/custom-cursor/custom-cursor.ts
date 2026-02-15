import { afterNextRender, Component, DestroyRef, ElementRef, inject, input, NgZone, Renderer2, signal, viewChild } from '@angular/core';
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

  private readonly outer = viewChild<ElementRef<HTMLDivElement>>('outer');
  private readonly inner = viewChild<ElementRef<HTMLDivElement>>('inner');

  private readonly ngZone = inject(NgZone);
  private readonly destroyRef = inject(DestroyRef);

  public readonly color = input('216, 112, 54');
  public readonly innerScale = input(3);

  protected readonly isPressed = signal(false);
  protected readonly isHovering = signal(false);

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

        const downSub = fromEvent(window, 'mousedown').subscribe(() => this.isPressed.set(true));
        const upSub = fromEvent(window, 'mouseup').subscribe(() => this.isPressed.set(false));

        const hoverSub = fromEvent<MouseEvent>(document, 'mouseover').subscribe(e => {
          const target = e.target as HTMLElement;
          const isClickable = !!target.closest('a, button, [data-clickable], .cursor-pointer');
          this.isHovering.set(isClickable);
        });

        this.animate();

        this.destroyRef.onDestroy(() => {
          moveSub.unsubscribe();
          downSub.unsubscribe();
          upSub.unsubscribe();
          hoverSub.unsubscribe();
        });
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

  this.outerX += (this.targetX - this.outerX) / 3.1;
  this.outerY += (this.targetY - this.outerY) / 3.1;
  this.innerX += (this.targetX - this.innerX) / 1.5;
  this.innerY += (this.targetY - this.innerY) / 1.5;

  outerEl.style.setProperty('--x', `${this.outerX}px`);
  outerEl.style.setProperty('--y', `${this.outerY}px`);
  
  innerEl.style.setProperty('--x', `${this.innerX}px`);
  innerEl.style.setProperty('--y', `${this.innerY}px`);

  requestAnimationFrame(() => this.animate());
}
}
