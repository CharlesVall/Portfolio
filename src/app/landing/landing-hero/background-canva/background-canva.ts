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
    const blendContainer = new Container();

    this.app.stage.addChild(container);
    this.app.stage.addChild(moonContainer);
    this.app.stage.addChild(blendContainer);
    
    const earthTexture = await Assets.load('canva/earth.png');
    const moonTexture = await Assets.load('canva/moon3.png');
    const blendTexture = await Assets.load('canva/transparent2.png');

    const earth = new Sprite(earthTexture);
    const moon = new Sprite(moonTexture);
    const blend = new Sprite(blendTexture);

    container.addChild(earth);
    moonContainer.addChild(moon)
    blendContainer.addChild(blend)
    
    earth.scale.set(0.5)
    earth.anchor.set(0.5)
    moon.anchor.set(0.5)
    moon.scale.x = -1
    blend.anchor.set(0.5)
    earth.x = container.width / 2;
    earth.y = container.height / 2;
    blend.x = blendContainer.width / 2;
    blend.y = blendContainer.height / 2;
    
    container.x = this.app.screen.width / 2;
    container.y = this.app.screen.height / 2 + 135;
    moonContainer.x = this.app.screen.width / 2;
    moonContainer.y = this.app.screen.height / 2 - 50;
    blendContainer.x = -this.app.screen.width / 2;
    blendContainer.y = this.app.screen.height - blendContainer.height;

    container.pivot.x = container.width / 2;
    container.pivot.y = container.height / 2;
    container.rotation =  - Math.PI / 2;  

    this.app.renderer.on('resize', () => {
      container.x = this.app!.screen.width / 2;
      moonContainer.x = this.app!.screen.width / 2;
    });

    this.app.ticker.add((time) => {
      animationOffset += 1;
      let delta = time.deltaTime
  
      let speed = this.app!.screen.height / 9000;
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