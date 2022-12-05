import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { cities } from '../cities';
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
  cities: ICity[];
  roomTypes: ICity[];

  uploadedFiles!: File[];
  imagePreview!: string;
  previews: []

  constructor(private formBuilder: FormBuilder) {
    (this.cities = cities()), (this.roomTypes = roomTypes()), this.uploadedFiles = []
  }

  addHotelForm: FormGroup = this.formBuilder.group({
    hotelName: new FormControl(null),
    roomType: new FormControl(null),
    location: new FormControl(null),
    stars: new FormControl(null),
    price: new FormControl(null),
    image: new FormControl(null),
    description: new FormControl(null),
  });

  ngOnInit(): void {
    console.log(this.cities);
  }

  onSubmit() {
    console.log(this.addHotelForm.value);
  }

  preview : string[] = [];
  onImageUpload(event: any) {

    for (let file of event.target.files) {
      this.uploadedFiles.push(file);
    
    
    }

    this.addHotelForm.patchValue({ image: this.uploadedFiles });
    this.addHotelForm.get('image')?.updateValueAndValidity();
  
    }
  }


  
  
