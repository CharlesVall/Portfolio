import { Component, HostListener, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ScrollService } from '@core/services/scroll-service/scroll-service';
import { SeoService } from '@core/services/seo-service/seo-service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit{
  private readonly scrollService = inject(ScrollService)
  private readonly seoService = inject(SeoService)

  public ngOnInit() {
    this.seoService.update({
      noIndex: false
    })
    
  }
}