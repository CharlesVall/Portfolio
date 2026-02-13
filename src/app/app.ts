import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ScrollService } from '@core/services/scroll-service/scroll-service';
import { SeoService } from '@core/services/seo-service/seo-service';
import { CustomCursor } from '@shared/components/custom-cursor/custom-cursor';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CustomCursor],
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