import { Component } from '@angular/core';
import { FooterBoard } from './footer-board/footer-board';
import { RevealDirective } from '@shared/directives/reveal.directive';

@Component({
  selector: 'app-contact',
  imports: [FooterBoard, RevealDirective],
  templateUrl: './contact.html',
  styleUrl: './contact.scss',
})
export class Contact {

}
