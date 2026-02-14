import { isPlatformBrowser } from '@angular/common';
import { afterNextRender, Component, ElementRef, inject, NgZone, OnDestroy, PLATFORM_ID, viewChild } from '@angular/core';
import { Application, Assets, Container, Sprite } from 'pixi.js';

@Component({
  selector: 'app-background-canva',
  imports: [],
  templateUrl: './background-canva.html',
  styleUrl: './background-canva.scss',
})
export class BackgroundCanva implements OnDestroy {
  private readonly canvaContainer = viewChild.required<ElementRef<HTMLDivElement>>('canvasContainer')

  private readonly ngZone = inject(NgZone);
  private readonly platformId = inject(PLATFORM_ID);

  private app?: Application;

  public constructor() {
    afterNextRender(async() => {
      if (isPlatformBrowser(this.platformId)) {
        await this.ngZone.runOutsideAngular(() => this.initPixi());
      }
    })
  }

  private resizeHandler = () => {
    this.app!.renderer.resize(window.innerWidth, window.innerHeight * 1.5);
  }

  private async initPixi() {     
    let animationOffset = 0;
    this.app = new Application();

    await this.app.init({ 

      width: window.innerWidth,
      height: window.innerHeight * 1.5,
      background: '#000000ff',
      resolution: window.devicePixelRatio || 1,
      autoDensity: true,
    });

    window.addEventListener('resize', this.resizeHandler);

    this.canvaContainer().nativeElement.appendChild(this.app.canvas)
    
    const container = new Container();
    const moonContainer = new Container();

    this.app.stage.addChild(container);
    this.app.stage.addChild(moonContainer);
    
    const earthTexture = await Assets.load('canva/earth.png');
    const moonTexture = await Assets.load('canva/moon3.png');

    const earth = new Sprite(earthTexture);
    const moon = new Sprite(moonTexture);

    container.addChild(earth);
    moonContainer.addChild(moon)
    
    earth.scale.set(0.5)
    earth.anchor.set(0.5)

    moon.anchor.set(0.5)
    moon.scale.x = -1

    earth.x = container.width / 2;
    earth.y = container.height / 2;
    
    container.x = this.app.screen.width / 2;
    container.y = this.app.screen.height / 2 + 135;

    container.pivot.set(container.width / 2, container.height / 2);
    container.rotation =  - Math.PI / 2;  

    const positionMoon = () => {
      const screenHeight = this.app!.screen.height;
      const screenWidth = this.app!.screen.width;

      const lastTierTopY = screenHeight * 2 / 4;
      const lastTierHeight = screenHeight / 4;
      const moonHeight = moon.height;

      moonContainer.x = screenWidth / 2;

      if (moonHeight > lastTierHeight) {
        moonContainer.y = lastTierTopY + moonHeight / 2;
      } else {
        moonContainer.y = screenHeight - moonHeight / 2;
      }
    };

    positionMoon();

    this.app.renderer.on('resize', () => {
      container.x = this.app!.screen.width / 2;
      positionMoon();
    });


    this.app.ticker.add((time) => {
      const delta = time.deltaTime
      const speed = this.app!.screen.height / 9000;
  
      container.y -= speed * delta;   
    })
  }
  
  public ngOnDestroy(): void {
    if (this.app) {
      this.app.destroy(true, {children: true, texture: true})
      window.removeEventListener('resize', this.resizeHandler)
    }
  }
}