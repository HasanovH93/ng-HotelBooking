import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of, switchMap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IHotel, IHotelDto, ISHotel } from '../modals/hotel';

@Injectable({
  providedIn: 'root',
})
export class HotelService {
  private apiUrl = environment.apiUrl;
  constructor(private http: HttpClient, private router: Router) {}

  createHotel(body: {}) {
    return this.http.post(this.apiUrl + 'hotels/create', body);
  }

  getLastHotels() {
    return this.http.get<IHotelDto>(this.apiUrl + 'hotels/last-hotels');
  }

  getHotels(params: any): Observable<any> {
    return this.http.get<IHotel>(this.apiUrl + `hotels/all-hotels`, { params });
  }

  getHotelById(id: string) {
    return this.http.get<ISHotel>(this.apiUrl + `hotels/details/${id}`).pipe(
      switchMap((res) => {
        return of(res.data);
      })
    );
  }

  deleteHotelById(id: string) {
    this.http.delete(this.apiUrl + `hotels/details/${id}`).subscribe({
      next: () => {
        this.router.navigate(['/']);
      },
    });
  }

  updateHotel(files: {}, id: string) {
    return this.http.put(this.apiUrl + `hotels/edit/${id}`, files).subscribe({
      next: () => {
        this.router.navigate([`/hotels/details/${id}`]);
      },
    });
  }

  likeHotel(id: string) {
    return this.http.get(this.apiUrl + `hotels/details/like/${id}`);
  }

  getLikedHotels() {
    return this.http.get<IHotel>(this.apiUrl + 'hotels/likes');
  }
}
