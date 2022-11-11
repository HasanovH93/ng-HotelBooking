import { Component, OnInit } from '@angular/core';

import { faStar,faArrowAltCircleRight  } from '@fortawesome/free-regular-svg-icons'

@Component({
  selector: 'app-hotel-view',
  templateUrl: './hotel-view.component.html',
  styleUrls: ['./hotel-view-component.css']
})
export class HotelViewComponent implements OnInit {
   faStar = faStar
   faArrow = faArrowAltCircleRight
  constructor() { }

  ngOnInit(): void {
  }

}
