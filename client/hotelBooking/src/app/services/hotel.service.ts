import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IHotel, IHotelDto } from '../modals/hotel';

@Injectable({
  providedIn: 'root'
})
export class HotelService {


  constructor(private http: HttpClient) { }

  private userUrl = 'http://localhost:3030/hotels/create';
  private hotelsUrl = 'http://localhost:3030/hotels/last-hotels';
  
  createAd(files: {}) {
    return this.http.post(this.userUrl  , files);
  }
  getLastHotels(){
    return this.http.get<IHotelDto>(this.hotelsUrl)
  }

  
}
