import { Component, OnInit } from '@angular/core';
import { IHotel } from 'src/app/modals/hotel';
import { HotelService } from 'src/app/services/hotel.service';
import { faStar } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-liked-hotels',
  templateUrl: './liked-hotels.component.html',
  styleUrls: ['./liked-hotels.component.scss']
})
export class LikedHotelsComponent implements OnInit {
defaultImg: string = '../../../assets/icons/user-profile.png';
hotels: IHotel[] | any;
faStar = faStar
  constructor(private hotelService: HotelService) { }

  ngOnInit(): void {
    this.hotelService.getLikedHotels().subscribe((res) => {
      console.log(res)
      this.hotels = res
    })
    
    }

}
