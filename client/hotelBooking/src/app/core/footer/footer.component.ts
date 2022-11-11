import { Component, OnInit } from '@angular/core';
import { faEnvelope,faArrowAltCircleRight  } from '@fortawesome/free-regular-svg-icons'
import {  faFacebook,faYoutube,faInstagram, faPinterest } from '@fortawesome/free-brands-svg-icons'

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
   
  faArrow = faArrowAltCircleRight
  faEnvelope = faEnvelope
  faFacebook = faFacebook
  faYoutube = faYoutube
  faInstagram = faInstagram
  faPinterest = faPinterest
  constructor() { }

  ngOnInit(): void {
  }

}
