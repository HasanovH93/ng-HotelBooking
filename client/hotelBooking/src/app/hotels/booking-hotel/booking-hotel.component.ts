import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { IHotel } from 'src/app/modals/hotel';
import { HotelService } from 'src/app/services/hotel.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-booking-hotel',
  templateUrl: './booking-hotel.component.html',
  styleUrls: ['./booking-hotel.component.scss'],
})
export class BookingHotelComponent implements OnInit {
  hotel: IHotel;
  userId!: string | null;
  isOwner: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private hotelService: HotelService,
    private actRoute: ActivatedRoute,
    private userService: UserService
  ) {}

  bookingForm: FormGroup = this.formBuilder.group({
    checkIn: new FormControl(null),
    checkOut: new FormControl(null),
    guests: new FormControl(null),
  });

  ngOnInit(): void {
    this.actRoute.params.subscribe(({ id }) => {
      this.getHotel(id);
    });
  }

  private getHotel(id: string) {
    this.hotelService.getHotelById(id).subscribe((hotel) => {
      this.hotel = hotel;
      this.userId = this.userService.getUserId();
      if (hotel.owner == this.userId) {
        this.isOwner = true;
      }
    });
  }

  onBook() {
    const body = {
      checkIn: this.bookingForm.controls['checkIn'].value,
      checkOut: this.bookingForm.controls['checkOut'].value,
      guests: this.bookingForm.controls['guests'].value,

      hotel: this.hotel._id,
    };
    this.hotelService.bookHotel(body);
  }
}
