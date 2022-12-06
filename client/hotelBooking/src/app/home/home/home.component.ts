import { Component, OnInit } from '@angular/core';
import { IHotel } from 'src/app/modals/hotel';
import { HotelService } from 'src/app/services/hotel.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  isLoading: boolean= true

  hotels: IHotel[] = [];

  constructor(private hotelService: HotelService) {}

  ngOnInit(): void {
    this.hotelService.getLastHotels().subscribe((data) => {
      this.hotels = data.latestHotels;
     
     this.isLoading = false
    });
  }
}
