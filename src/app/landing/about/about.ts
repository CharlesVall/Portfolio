import { AfterViewInit, Component } from '@angular/core';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TechDisplayer } from './tech-displayer/tech-displayer';
import { DetailsDisplayer } from './details-displayer/details-displayer';

gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-about',
  imports: [TechDisplayer, DetailsDisplayer],
  templateUrl: './about.html',
  styleUrl: './about.scss',
})
export class About implements AfterViewInit {

    public ngAfterViewInit() {

    const details = gsap.utils.toArray(".details:not(:first-child)")
    const images: any = gsap.utils.toArray(".image:not(:first-child)")


    gsap.set(images, {yPercent:101})

    const allImages: any = gsap.utils.toArray(".image")


    let mm = gsap.matchMedia();

    mm.add("(min-width: 600px)", () => {
    
      console.log("desktop")
    
      ScrollTrigger.create({
    	trigger:".container",
    	start:"top top",
    	end:"bottom bottom",
    	pin:".right"
    })

    details.forEach((detail: any, index)=> {
    
    	let headline = detail.querySelector("h2")
    	let animation = gsap.timeline()
    	   .to(images[index], {yPercent:0})
    	   .set(allImages[index], {autoAlpha:0})
    	ScrollTrigger.create({
    		trigger:headline,
    		start:"top 80%",
    		end:"top 50%",
    		animation:animation,
    		scrub:1,
    		markers:false
    	})
    })
      return () => {
    	  console.log("mobile")
      };
    });
  }
}