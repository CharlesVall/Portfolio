import { Component } from '@angular/core';
import { LandingHero } from './landing-hero/landing-hero';
import { Header } from './header/header';
import { About } from './about/about';
import { Work } from './work/work';
import { Contact } from './contact/contact';

@Component({
  selector: 'app-landing',
  imports: [Header, LandingHero, About, Work, Contact],
  templateUrl: './landing.html',
  styleUrl: './landing.scss',
})
export class Landing {

}
