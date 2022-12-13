import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HotelService } from 'src/app/services/hotel.service';


@Component({
  selector: 'app-confirmation-service',
  templateUrl: './confirmation-service.component.html',
  styleUrls: ['./confirmation-service.component.scss']
})
export class ConfirmationDialog {
  
  constructor(private activatedRoute: ActivatedRoute, private hotelService: HotelService){}

  onDelete(){
    this.activatedRoute.params.subscribe(({ id }) => {
      console.log(id)
      this.hotelService.deleteHotelById(id);
    });
  }

}