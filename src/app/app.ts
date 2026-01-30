import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ScrollService } from '@core/services/scroll-service/scroll-service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  private readonly scrollService = inject(ScrollService)
}