import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { IHotelDto } from '../modals/hotel';

@Injectable({
  providedIn: 'root',
})
export class HotelService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  createHotel(body: {}) {
    return this.http.post(this.apiUrl + 'hotels/create', body);
  }
  getLastHotels() {
    return this.http.get<IHotelDto>(this.apiUrl + 'hotels/last-hotels');
  }
}
