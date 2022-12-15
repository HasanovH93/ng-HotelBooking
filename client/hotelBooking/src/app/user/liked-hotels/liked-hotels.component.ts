import { Component, OnInit } from '@angular/core';
import { IHotel } from 'src/app/modals/hotel';
import { HotelService } from 'src/app/services/hotel.service';
import { faStar } from '@fortawesome/free-regular-svg-icons';

@Component({
  selector: 'app-liked-hotels',
  templateUrl: './liked-hotels.component.html',
  styleUrls: ['./liked-hotels.component.scss']
})
export class LikedHotelsComponent implements OnInit {
hotels: IHotel[] | any
faStar = faStar
  constructor(private hotelService: HotelService) { }

  ngOnInit(): void {
    this.hotelService.getLikedHotels().subscribe((res) => {
      this.hotels = res
    })
    
    }

}
