import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { IHotel } from 'src/app/modals/hotel';
import { HotelService } from 'src/app/services/hotel.service';
import { MessageService, MessageType } from 'src/app/services/message.service';
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
  isLoading: boolean = false;
  messageSuccess: string;
  errorMessage: string;
  isErrorType: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private hotelService: HotelService,
    private actRoute: ActivatedRoute,
    private userService: UserService,
    private msgService: MessageService
  ) {}

  bookingForm: FormGroup = this.formBuilder.group({
    checkIn: new FormControl('',Validators.required),
    checkOut: new FormControl('',Validators.required),
    guests: new FormControl('',Validators.required),
  });

  ngOnInit(): void {
    this.actRoute.params.subscribe(({ id }) => {
      this.getHotel(id);
    });

    this.msgService.onMessage$.subscribe((message) => {
      this.isLoading = false
      this.errorMessage = message.text;
      this.isErrorType = message.type === MessageType.error;
      if (this.errorMessage) {
        setTimeout(() => {
          this.errorMessage = '';
         
        }, 3000);
      }
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
    this.isLoading = true
    const body = {
      checkIn: this.bookingForm.controls['checkIn'].value,
      checkOut: this.bookingForm.controls['checkOut'].value,
      guests: this.bookingForm.controls['guests'].value,

      hotel: this.hotel,
    };
    this.hotelService.bookHotel(body)
  }
}
