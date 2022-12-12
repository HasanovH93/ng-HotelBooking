import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { faStar } from '@fortawesome/free-regular-svg-icons';
import {  faHome } from '@fortawesome/free-solid-svg-icons';
import { IHotel } from 'src/app/modals/hotel';
import { HotelService } from 'src/app/services/hotel.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-details-view',
  templateUrl: './details-view.component.html',
  styleUrls: ['./details-view.component.scss'],
})
export class DetailsViewComponent implements OnInit {
  faStar = faStar;
  faHome = faHome;
  hotel!: IHotel;
  userId!: string | null;
  isOwner: boolean = false;



  constructor(
    private hotelService: HotelService,
    private actRoute: ActivatedRoute,
    private userService:UserService
  ) {}

  ngOnInit(): void {
    this.actRoute.params.subscribe(({ id }) => {
      console.log(id);
      this.getHotel(id);
    });
  }



  private getHotel(id: string) {
    this.hotelService.getHotelById(id).subscribe((hotel) => {
      this.hotel = hotel;
       this.userId = this.userService.getUserId()
       console.log(this.userId)
       console.log(hotel.owner)
       if(hotel.owner == this.userId){
        this.isOwner = true
       }
    });
  }
}
