import { Component, inject } from '@angular/core';
import { MailLink } from "./mail-link/mail-link";
import { MagicResizeService } from '@core/services/magic-resize-service/magic-resize-service';

@Component({
  selector: 'app-contact-links',
  imports: [MailLink],
  templateUrl: './contact-links.html',
  styleUrl: './contact-links.scss',
})
export class ContactLinks {
  private readonly magicResizeService = inject(MagicResizeService)
  public readonly magicColor = this.magicResizeService.magicColor
}
