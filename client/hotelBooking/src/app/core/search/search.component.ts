import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { cities } from 'src/app/hotels/cities';
import { HotelService } from 'src/app/services/hotel.service';

export interface ITypes {
  name: string;
}
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  cities: ITypes[];
  constructor(
    private formBuilder: FormBuilder,
    private hotelService: HotelService
  ) {
    this.cities = cities();
  }

  searchForm: FormGroup = this.formBuilder.group({
    location: new FormControl(null),
    stars: new FormControl(null),
    price: new FormControl(null),
  });

  ngOnInit(): void {}

  onSearch() {
    const body = {
      location: this.searchForm.value.location,
      stars: this.searchForm.value.stars,
      price: this.searchForm.value.price,
    };
    this.hotelService.search(body);
  }
}
