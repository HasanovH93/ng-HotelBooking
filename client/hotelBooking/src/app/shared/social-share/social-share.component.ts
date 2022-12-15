import { Component, OnInit } from '@angular/core';
import {  faFacebook,faYoutube,faInstagram, faPinterest } from '@fortawesome/free-brands-svg-icons'

@Component({
  selector: 'app-social-share',
  templateUrl: './social-share.component.html',
  styleUrls: ['./social-share.component.scss']
})
export class SocialShareComponent implements OnInit {
faFacebook = faFacebook;
faYoutube = faYoutube;
faInstagram = faInstagram;
faPinteres = faPinterest


  constructor() { }

  ngOnInit(): void {
  }

}
