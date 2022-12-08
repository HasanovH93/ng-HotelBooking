import { Component, OnInit } from '@angular/core';
import { IHotel } from '../../modals/hotel';

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
  isLoading: boolean = true;

  hotels: IHotel[] = [];

  constructor(private hotelService: HotelService) {}

  ngOnInit(): void {
    this.hotelService.getLastHotels().subscribe((data) => {
      this.hotels = data.latestHotels;

      this.isLoading = false;
    });
  }
}
