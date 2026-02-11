import { Component, inject } from '@angular/core';
import { MagicResizeService } from '@core/services/magic-resize-service/magic-resize-service';

@Component({
  selector: 'app-mail-link',
  imports: [],
  templateUrl: './mail-link.html',
  styleUrl: './mail-link.scss',
})
export class MailLink {
  private readonly magicResizeService = inject(MagicResizeService)
  public readonly magicColor = this.magicResizeService.magicColor;
}
