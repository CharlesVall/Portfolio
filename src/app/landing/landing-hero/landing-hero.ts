import { Component } from '@angular/core';
import { BackgroundCanva } from './background-canva/background-canva';
import { HeroTitle } from './hero-title/hero-title';

@Component({
  selector: 'app-landing-hero',
  imports: [BackgroundCanva, HeroTitle],
  templateUrl: './landing-hero.html',
  styleUrl: './landing-hero.scss',
})
export class LandingHero {

}
