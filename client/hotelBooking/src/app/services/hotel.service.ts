import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IAllHotels, IHotelDto } from '../modals/hotel';

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

  getHotels(params: any):Observable<any> {
    return this.http.get<IAllHotels>(this.apiUrl+ `hotels/all-hotels`, {params});
  }

  
}
