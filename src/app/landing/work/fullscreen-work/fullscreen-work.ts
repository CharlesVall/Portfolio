import { Component, inject } from '@angular/core';
import { WorkService } from '@core/services/work-service/work-service';

@Component({
  selector: 'app-fullscreen-work',
  imports: [],
  templateUrl: './fullscreen-work.html',
  styleUrl: './fullscreen-work.scss',
})
export class FullscreenWork {
  private readonly workService = inject(WorkService);

  protected close(): void {
    this.workService.closeOverlay()
  }
}
