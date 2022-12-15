import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IHotel } from 'src/app/modals/hotel';
import { HotelService } from 'src/app/services/hotel.service';
import { MessageService, MessageType } from 'src/app/services/message.service';
import { cities } from '../cities';
import { facilities } from '../facilities';
import { roomTypes } from '../roomTypes';
export interface ICity {
  name: string;
}

@Component({
  selector: 'app-edit-hotel',
  templateUrl: './edit-hotel.component.html',
  styleUrls: ['./edit-hotel.component.scss'],
})
export class EditHotelComponent implements OnInit {
  errorMessage: string;
  isErrorType: boolean;
  isUpload: boolean = true;
  loading: boolean = false;
  cities: ICity[];
  roomTypes: ICity[];
  uploadedFiles!: File[];
  imageErrorMessage: string;
  hotelData: IHotel;
  facilities: any;
  facilityOptions: string[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private hotelService: HotelService,
    private router: Router,
    private msgService: MessageService,
    private activatedRoute: ActivatedRoute
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

    this.activatedRoute.params.subscribe(({ id }) => {
      this.getHotel(id);
    });
  }

  getHotel(id: string) {
    this.hotelService.getHotelById(id).subscribe((res) => {
      this.hotelData = res;
      console.log(res.imageUrls)
      this.facilityOptions = res.facilities[0].split(',');
      const facilities: FormArray = this.addHotelForm.get(
        'facilities'
      ) as FormArray;
      for (const option of this.facilityOptions) {
        facilities.push(new FormControl(option));
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
    this.loading = true;
    this.isUpload = false;
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
    formData.append('owner', this.hotelData.owner);
    formData.append('_id', this.hotelData._id);
    formData.append('ownerEmail', this.hotelData.ownerEmail);
    formData.append('ownerImage', this.hotelData.ownerImage);

    const id = this.hotelData._id;
    if (this.uploadedFiles != undefined && this.uploadedFiles.length > 0) {
      this.hotelService.updateHotel(formData, id);
    }

    // const body: IHotel = {
    //   _id: this.hotelData._id,
    //   owner: this.hotelData.owner,
    //   ownerEmail: this.hotelData.ownerEmail,
    //   ownerImage: this.hotelData.ownerImage,
    //   hotelName: this.hotelData.hotelName,
    //   roomType: this.hotelData.roomType,
    //   location: this.hotelData.location,
    //   address: this.hotelData.address,
    //   stars: this.hotelData.stars,
    //   price: this.hotelData.price,
    //   description: this.hotelData.description,
    //   facilities: this.hotelData.facilities,

    // }
  }
}