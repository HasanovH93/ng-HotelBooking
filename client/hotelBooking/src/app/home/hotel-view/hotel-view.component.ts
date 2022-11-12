import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from '../../api-service.service';

import { faStar,faArrowAltCircleRight  } from '@fortawesome/free-regular-svg-icons'

@Component({
  selector: 'app-hotel-view',
  templateUrl: './hotel-view.component.html',
  styleUrls: ['./hotel-view-component.css']
})
export class HotelViewComponent implements OnInit {
   faStar = faStar
   faArrow = faArrowAltCircleRight
  constructor(private apiService: ApiServiceService) { }

  ngOnInit(): void {
    this.apiService.loadFlights().subscribe({
      next: (value) => {
        console.log(value)
      }
    })
  }

}
