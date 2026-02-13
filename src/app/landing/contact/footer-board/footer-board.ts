import { Component, inject } from '@angular/core';
import { DownloadButton } from './download-button/download-button';
import { ContactLinks } from "./contact-links/contact-links";
import { MagicResizeService } from '@core/services/magic-resize-service/magic-resize-service';

@Component({
  selector: 'app-footer-board',
  imports: [DownloadButton, ContactLinks],
  templateUrl: './footer-board.html',
  styleUrl: './footer-board.scss',
})
export class FooterBoard {
  private readonly magicResizeService = inject(MagicResizeService)
  protected readonly magicColor = this.magicResizeService.magicColor;
}
