import { Component, OnDestroy, OnInit } from '@angular/core';
import { IHotel } from 'src/app/modals/hotel';
import { HotelService } from 'src/app/services/hotel.service';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-search-data',
  templateUrl: './search-data.component.html',
  styleUrls: ['./search-data.component.scss']
})
export class SearchDataComponent implements OnInit, OnDestroy {
hotels! : IHotel[];
isLoading: boolean = true
faStar = faStar;
searchedDataSubscription: Subscription
  constructor(private hotelService:HotelService) { }

  ngOnInit(): void {
   this.searchedDataSubscription = this.hotelService.currentSearchData$.subscribe((data) => {
      this.hotels = data
      console.log(data)
    })
    this.isLoading = false
  }
  ngOnDestroy(): void {
    this.searchedDataSubscription.unsubscribe();
  }

}
