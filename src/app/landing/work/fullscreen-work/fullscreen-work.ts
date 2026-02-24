import { Component, inject, signal } from '@angular/core';
import { WorkService } from '@core/services/work-service/work-service';
import { FullscreenAside } from './fullscreen-aside/fullscreen-aside';
import { FullscreenButton } from "./fullscreen-button/fullscreen-button";
import { FullscreenFooter } from './fullscreen-footer/fullscreen-footer';
import { FullscreenImage } from "./fullscreen-image/fullscreen-image";

@Component({
  selector: 'app-fullscreen-work',
  standalone: true,
  imports: [FullscreenAside, FullscreenButton, FullscreenFooter, FullscreenImage],
  templateUrl: './fullscreen-work.html',
  styleUrl: './fullscreen-work.scss'
})
export class FullscreenWork {
  private readonly workService = inject(WorkService);
  protected readonly isFullscreenShown = this.workService.isWorkFullscreen;
  protected readonly workData = this.workService.activeWork;
  protected readonly isExiting = signal(false);

  protected async close(): Promise<void> {
    this.isExiting.set(true);

    await new Promise(resolve => setTimeout(resolve, 500));
    this.workService.closeFullscreen();
    this.isExiting.set(false);
  }
}