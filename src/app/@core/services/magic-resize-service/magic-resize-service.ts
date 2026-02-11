import { Injectable, inject, PLATFORM_ID, computed } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { fromEvent, map, startWith, of } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';

@Injectable({ providedIn: 'root' })
export class MagicResizeService {
  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));

  private readonly width$ = this.isBrowser
    ? fromEvent(window, 'resize').pipe(
        map(() => window.innerWidth),
        startWith(window.innerWidth)
      )
    : of(1200);

  public readonly windowWidth = toSignal(this.width$, { initialValue: 1200 });

  public readonly magicColor = computed(() => {
    const width = this.windowWidth() ?? 1200;
    const minW = 320;
    const maxW = 1920;

    const ratio = Math.min(Math.max((width - minW) / (maxW - minW), 0), 1);
    
    const hue = Math.floor(ratio * 360);

    return `hsl(${hue}, 80%, 60%)`;
  });
}