import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Application, Assets, Container, Sprite, Text } from 'pixi.js';

@Component({
  selector: 'app-background-canva',
  imports: [],
  templateUrl: './background-canva.html',
  styleUrl: './background-canva.scss',
})
export class BackgroundCanva implements OnInit {
  @ViewChild('canvasContainer', { static: true }) canvaContainer!: ElementRef;

  public constructor(private renderer: Renderer2) {}

  public ngOnInit(): void {
    (async ()  => {
      let delay = 0;
      const app = new Application();

      await app.init({ 
        width: window.innerWidth,
        height: window.innerHeight * 1.5,
        background: '#000000ff'
      });

      this.renderer.appendChild(this.canvaContainer.nativeElement, app.canvas);

      const container = new Container();
      const moonContainer = new Container();
      const blendContainer = new Container();

      app.stage.addChild(container);
      app.stage.addChild(moonContainer);
      app.stage.addChild(blendContainer);

      const earthTexture = await Assets.load('earth2.png');
      const moonTexture = await Assets.load('moon.png')
      const blendTexture = await Assets.load('transparent3.png')

      const earth = new Sprite(earthTexture);
      const moon = new Sprite(moonTexture);
      const blend = new Sprite (blendTexture);

      container.addChild(earth);
      moonContainer.addChild(moon)
      moonContainer.addChild(blend)
      
      moon.y = -190;
      blend.y = 518;
      earth.scale.set(0.5)
  
      container.x = app.screen.width / 2;
      container.y = app.screen.height / 2 + 135;
      container.pivot.x = container.width / 2;
      container.pivot.y = container.height / 2;
      container.rotation = - Math.PI / 2;      

      app.ticker.add((time) => {
        delay += 1;
        let delta = time.deltaTime
      
        let speed = 0.1;
        if (delay < 8000) {
          container.y -= speed * delta;
        }
      })

    })();
  }
}
