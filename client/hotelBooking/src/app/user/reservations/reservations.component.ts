import { Component, OnInit } from '@angular/core';
import { IBookings } from 'src/app/modals/booking';
import { HotelService } from 'src/app/services/hotel.service';
import { faStar } from '@fortawesome/free-solid-svg-icons';



@Component({
  selector: 'app-reservations',
  templateUrl: './reservations.component.html',
  styleUrls: ['./reservations.component.scss']
})
export class ReservationsComponent implements OnInit {
  
defaultImg: string = '../../../assets/icons/user-profile.png';
faStar = faStar
reservations: IBookings[] | any
isLoading : boolean = true;
checkIn:string;
checkOut:string;
  constructor(private hotelService: HotelService) { }

  ngOnInit(): void {
    this.hotelService.getReservations().subscribe((res) => {
      console.log(res)
      this.reservations = res
      this.isLoading = false
    })
  }

}
