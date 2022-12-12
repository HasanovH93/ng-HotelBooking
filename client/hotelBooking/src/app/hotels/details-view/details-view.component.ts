import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { faStar } from '@fortawesome/free-regular-svg-icons';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import { IHotel } from 'src/app/modals/hotel';
import { HotelService } from 'src/app/services/hotel.service';
import { UserService } from 'src/app/services/user.service';
import {
  faTv,
  faWifi,
  faElevator,
  faSpa,
  faUtensils,
  faSquareParking,
  faMartiniGlass,
  faPaw,
  faKitchenSet,
  faMugSaucer,
  faPersonSwimming,
  faVault,
  faBath,
  faDumbbell,
} from '@fortawesome/free-solid-svg-icons';

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
  facilitiesArray: Array<any>;
  singleFacilityObject: any = {};
  facilitiesDataArray: Array<any> = [];

  constructor(
    private hotelService: HotelService,
    private actRoute: ActivatedRoute,
    private userService: UserService
  ) {}

  facilities: Array<any> = [
    { name: 'TV', value: 'TV', icon: faTv },
    { name: 'Spa', value: 'Spa', icon: faSpa },
    { name: 'Wi-Fi', value: 'Wi-Fi', icon: faWifi },
    { name: 'Elevator', value: 'Elevator', icon: faElevator },
    { name: 'Restaurant', value: 'Restaurant', icon: faUtensils },
    { name: 'Parking', value: 'Parking', icon: faSquareParking },
    { name: 'Bar', value: 'Bar', icon: faMartiniGlass },
    { name: 'Pet Friendly', value: 'Pet Friendly', icon: faPaw },
    { name: 'Kitchen', value: 'Kitchen', icon: faKitchenSet },
    { name: 'Breakfast', value: 'Breakfast', icon: faMugSaucer },
    { name: 'Pool', value: 'Pool', icon: faPersonSwimming },
    { name: 'Bath', value: 'Bath', icon: faBath },
    { name: 'Fitness', value: 'Fitness', icon: faDumbbell },
    { name: 'Safe', value: 'Safe', icon: faVault },
  ];

  ngOnInit(): void {
    this.actRoute.params.subscribe(({ id }) => {
      this.getHotel(id);
    });
  }

  getFacilityData(facility: any) {
    return this.facilities.find((item: any) => item.name === facility);
  }
  getActualFacilityData() {
    return this.facilitiesDataArray;
  }

  private getHotel(id: string) {
    this.hotelService.getHotelById(id).subscribe((hotel) => {
      this.hotel = hotel;
      this.facilitiesArray = hotel.facilities[0].split(',');
      for (let facility of this.facilitiesArray) {
        this.singleFacilityObject = this.getFacilityData(facility);
        this.facilitiesDataArray.push(this.singleFacilityObject);
      }
      this.facilitiesDataArray = this.getActualFacilityData();

      this.userId = this.userService.getUserId();
      if (hotel.owner == this.userId) {
        this.isOwner = true;
      }
    });
  }
}
