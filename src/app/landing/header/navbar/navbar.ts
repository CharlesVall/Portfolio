import { Component, inject } from '@angular/core';
import { ScrollService } from '@core/services/scroll-service/scroll-service';

@Component({
  selector: 'app-navbar',
  imports: [],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
})
export class Navbar {
  private readonly scrollService = inject(ScrollService)

  protected scrollToSection(id: string): void {
    this.scrollService.scrollTo(id);
  }
}
