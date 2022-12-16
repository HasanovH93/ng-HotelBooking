import { Component, OnDestroy, OnInit } from '@angular/core';
import { IHotel } from 'src/app/modals/hotel';
import { HotelService } from 'src/app/services/hotel.service';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-all-hotels',
  templateUrl: './all-hotels.component.html',
  styleUrls: ['./all-hotels.component.scss'],
})
export class AllHotelsComponent implements OnInit,OnDestroy {
  page = 0;
  Data: IHotel[] = [];
  isLoading: boolean = true
  faStar = faStar
  hotelDataSubscription!: Subscription;

  constructor(private hotelService: HotelService) {}

  ngOnInit(): void {
    this.getHotel();
  }
  ngOnDestroy(): void {
    this.hotelDataSubscription.unsubscribe();
  }

  onScroll() {
      this.page += 1;
      this.getHotel();
    
   
  }

  getHotel(): void {
    this.isLoading = true
    
    this.hotelDataSubscription = this.hotelService.getHotels({ page: this.page }).subscribe((res) => {
      res.forEach((element: IHotel) => {
        this.isLoading = false  
        this.Data.push(element);
      });
      this.isLoading = false
    });
  }
}