import { Component, OnInit } from '@angular/core';
import { IHotel, IHotelDto } from '../../modals/hotel';

import {
  faStar,
  faArrowAltCircleRight,
} from '@fortawesome/free-regular-svg-icons';
import { HotelService } from 'src/app/services/hotel.service';

@Component({
  selector: 'app-hotel-view',
  templateUrl: './hotel-view.component.html',
  styleUrls: ['./hotel-view.component.scss'],
})
export class HotelViewComponent implements OnInit {
  faStar = faStar;
  faArrow = faArrowAltCircleRight;

  hotels: IHotel[] = [];
  icons: string[] = [];
  image = '../../../assets/icons/user-profile.png';
  constructor(private hotelService: HotelService) {}

  ngOnInit(): void {
    this.hotelService.getLastHotels().subscribe((data) => {
      this.hotels = data.latestHotels;
      for(let hotel of data.latestHotels){
       for(let i=0; i<= hotel.stars; i++){
        this.icons.push(this.image)
       }
     return
      }

    });
  }
}
