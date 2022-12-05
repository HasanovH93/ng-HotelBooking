import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { HotelService } from 'src/app/services/hotel.service';
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
  previews: [];

  constructor(private formBuilder: FormBuilder,private hotelService:HotelService, private router: Router) {
    (this.cities = cities()),
      (this.roomTypes = roomTypes()),
      (this.uploadedFiles = []);
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

  

  preview: string[] = [];
  onImageUpload(event: any) {
    for (let file of event.target.files) {
      this.uploadedFiles.push(file);
    }

    this.addHotelForm.patchValue({ image: this.uploadedFiles });
    this.addHotelForm.get('image')?.updateValueAndValidity();
  }


  onSubmit() {
    const formData : FormData = new FormData();
    if(this.uploadedFiles.length != undefined){
      for(const file of this.addHotelForm.controls['image'].value){
        formData.append('img',file)
      }
    }
    const {hotelName,roomType,location,stars,price,description} = this.addHotelForm.value;

    formData.append('hotelName', hotelName);
    formData.append('roomType', roomType);
    formData.append('location', location);
    formData.append('stars', stars);
    formData.append('price', price);
    formData.append('description', description)
  
 
   this.hotelService.createAd(formData).subscribe({
    next: (res) => {
      console.log(res)
    },
    complete: () => {
     this.router.navigate(['/'])
    }
   })

  }
}
