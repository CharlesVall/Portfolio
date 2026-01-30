import { Component } from '@angular/core';
import { LandingHero } from './landing-hero/landing-hero';
import { Header } from './header/header';
import { About } from './about/about';

@Component({
  selector: 'app-landing',
  imports: [Header, LandingHero, About],
  templateUrl: './landing.html',
  styleUrl: './landing.scss',
})
export class Landing {

}
