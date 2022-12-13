import { Component, OnInit } from '@angular/core';
import { IHotel } from 'src/app/modals/hotel';
import { HotelService } from 'src/app/services/hotel.service';
import { faStar } from '@fortawesome/free-regular-svg-icons';

@Component({
  selector: 'app-all-hotels',
  templateUrl: './all-hotels.component.html',
  styleUrls: ['./all-hotels.component.scss'],
})
export class AllHotelsComponent implements OnInit {
  page = 0;
  Data: IHotel[] = [];
  isLoading: boolean = true
  faStar = faStar
  iconsArray = Array;
  stars:number;

  constructor(private hotelService: HotelService) {}

  ngOnInit(): void {
    this.getHotel();
  }

  onScroll() {
      this.page += 1;
      this.getHotel();
    
   
  }

  getHotel(): void {
    this.isLoading = true
    
    this.hotelService.getHotels({ page: this.page }).subscribe((res) => {
      res.forEach((element: IHotel) => {
        this.isLoading = false  
         this.stars = element.stars
        this.Data.push(element);
      });
      this.isLoading = false
      console.log(res);
    });
  }
}