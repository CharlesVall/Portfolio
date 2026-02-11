import { Component, DestroyRef, ElementRef, inject, input, NgZone, OnInit, Renderer2, viewChild } from '@angular/core';
import { fromEvent } from 'rxjs';

@Component({
  selector: 'app-custom-cursor',
  imports: [],
  templateUrl: './custom-cursor.html',
  styleUrl: './custom-cursor.scss',
})
export class CustomCursor implements OnInit {
  private readonly outer = viewChild<ElementRef<HTMLDivElement>>('outer');
  private readonly inner = viewChild<ElementRef<HTMLDivElement>>('inner');

  public readonly color = input('216, 112, 54');
  
  private ngZone = inject(NgZone);
  private renderer = inject(Renderer2);
  private destroyRef = inject(DestroyRef);

  public ngOnInit() {
    this.ngZone.runOutsideAngular(() => {
      const moveSub = fromEvent<MouseEvent>(window, 'mousemove')
        .subscribe(e => this.updatePosition(e));

      this.animate();

      this.destroyRef.onDestroy(() => moveSub.unsubscribe());
    });
  }

  private updatePosition(e: MouseEvent) {
    this.renderer.setStyle(this.outer, 'left', `${e.clientX}px`);
    this.renderer.setStyle(this.outer, 'top', `${e.clientY}px`);
  }
  
  private animate() {
    requestAnimationFrame(() => this.animate());
  }
}
