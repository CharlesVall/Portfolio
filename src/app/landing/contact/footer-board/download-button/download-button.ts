import { Component, inject } from '@angular/core';
import { MagicResizeService } from '@core/services/magic-resize-service/magic-resize-service';

@Component({
  selector: 'app-download-button',
  imports: [],
  templateUrl: './download-button.html',
  styleUrl: './download-button.scss',
})
export class DownloadButton {
  private readonly magicResizeService = inject(MagicResizeService)
  protected readonly magicColor = this.magicResizeService.magicColor;

  protected downloadCV(): void {
    const link = document.createElement('a');
    link.href = 'files/CV-Sénard--Vallois.pdf';
    link.download = 'CV-Sénard--Vallois.pdf';
    link.click();
  }
}
