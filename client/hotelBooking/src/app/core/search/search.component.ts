import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { cities } from 'src/app/hotels/cities';

export interface ITypes {
  name: string;
}
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  cities: ITypes[];
  constructor(private formBuilder : FormBuilder) {this.cities = cities() }

  searchForm: FormGroup = this.formBuilder.group({
    location: new FormControl(null),
    stars: new FormControl(null),
    price: new FormControl(null),
  })


  ngOnInit(): void {
  }

}
