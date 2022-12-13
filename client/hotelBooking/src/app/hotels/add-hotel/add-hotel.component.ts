import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { HotelService } from 'src/app/services/hotel.service';
import { MessageService, MessageType } from 'src/app/services/message.service';
import { cities } from '../cities';
import { facilities } from '../facilities';
import { roomTypes } from '../roomTypes';
export interface ICity {
  name: string;
}

@Component({
  selector: 'app-add-hotel',
  templateUrl: './add-hotel.component.html',
  styleUrls: ['./add-hotel.component.scss'],
})
export class AddHotelComponent implements OnInit {
  errorMessage: string;
  isErrorType: boolean;
  cities: ICity[];
  roomTypes: ICity[];
  uploadedFiles!: File[];
  imageErrorMessage: string;
  facilities: any;

  constructor(
    private formBuilder: FormBuilder,
    private hotelService: HotelService,
    private router: Router,
    private msgService: MessageService
  ) {
    (this.cities = cities()),
      (this.roomTypes = roomTypes()),
      (this.uploadedFiles = []);
    this.facilities = facilities();
  }

  addHotelForm: FormGroup = this.formBuilder.group({
    hotelName: new FormControl(null, [Validators.required]),
    roomType: new FormControl(null, [Validators.required]),
    location: new FormControl(null, [Validators.required]),
    address: new FormControl(null),
    stars: new FormControl(null, [Validators.required]),
    price: new FormControl(null, [
      Validators.required,
      Validators.min(Number.MIN_VALUE),
    ]),
    image: new FormControl(null, [Validators.required]),
    description: new FormControl(null, [
      Validators.required,
      Validators.minLength(15),
    ]),
    facilities: this.formBuilder.array([]),
  });

  ngOnInit(): void {
    this.msgService.onMessage$.subscribe((message) => {
      this.errorMessage = message.text;
      this.isErrorType = message.type === MessageType.error;
      if (this.errorMessage) {
        setTimeout(() => {
          this.errorMessage = '';
        }, 3000);
      }
    });
  }

  onCheckBoxChange(event: any) {
    const facilities: FormArray = this.addHotelForm.get(
      'facilities'
    ) as FormArray;
    if (event.target.checked) {
      facilities.push(new FormControl(event.target.value));
    } else {
      let i = 0;
      facilities.controls.forEach((item: any) => {
        if (item.value == event.target.value) {
          facilities.removeAt(i);
          return;
        }
      });
      i++;
    }
  
  }
  onImageUpload(event: any) {
    this.imageErrorMessage = '';

    for (let file of event.target.files) {
      this.uploadedFiles.push(file);
    }

    this.addHotelForm.patchValue({ image: this.uploadedFiles });
    this.addHotelForm.get('image')?.updateValueAndValidity();
  }
  onImageDelete(i: any) {
    this.uploadedFiles.splice(i, 1);
  }

  onSubmit(event: Event) {
    const formData: FormData = new FormData();

    if (this.uploadedFiles.length != undefined) {
      if (!this.addHotelForm.controls['image'].value) {
        this.imageErrorMessage = 'At least one image is required';
      } else {
        for (const file of this.addHotelForm.controls['image'].value) {
          formData.append('img', file);
        }
      }
    }

    const {
      hotelName,
      roomType,
      location,
      address,
      stars,
      price,
      description,
      facilities,
    } = this.addHotelForm.value;

    formData.append('hotelName', hotelName);
    formData.append('roomType', roomType);
    formData.append('location', location);
    formData.append('address', address);
    formData.append('stars', stars);
    formData.append('price', price);
    formData.append('description', description);
    formData.append('facilities', facilities);

    this.hotelService.createHotel(formData).subscribe({
      next: (res) => {
        console.log(res);
      },
      complete: () => {
        this.router.navigate(['/']);
      },
    });
  }
}
