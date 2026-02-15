import { NgOptimizedImage } from '@angular/common';
import { Component, inject } from '@angular/core';
import { WorkService } from '@core/services/work-service/work-service';

@Component({
  selector: 'app-fullscreen-work',
  imports: [NgOptimizedImage],
  templateUrl: './fullscreen-work.html',
  styleUrl: './fullscreen-work.scss',
})
export class FullscreenWork {
  private readonly workService = inject(WorkService);
  protected readonly isFullscreenShown = this.workService.isWorkFullscreen;
  protected readonly workData = this.workService.activeWork;

  protected close(): void {
    this.workService.closeFullscreen()
  }
}
