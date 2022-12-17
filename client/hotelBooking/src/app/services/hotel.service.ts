import { HttpClient } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, of, Subscription, switchMap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IHotel, IHotelDto, ISearch, ISHotel } from '../modals/hotel';

@Injectable({
  providedIn: 'root',
})
export class HotelService implements OnDestroy {
  private apiUrl = environment.apiUrl;
  private _searchData = new BehaviorSubject<any>(undefined);
  searchDataSubscription!: Subscription;
  editDataSubscription!: Subscription;
  deleteHotelSubscription!: Subscription;

  currentSearchData$ = this._searchData.asObservable();
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
    this.deleteHotelSubscription = this.http
      .delete(this.apiUrl + `hotels/details/${id}`)
      .subscribe({
        next: () => {
          this.router.navigate(['/']);
        },
      });
  }

  updateHotel(files: {}, id: string) {
    this.editDataSubscription = this.http
      .put(this.apiUrl + `hotels/edit/${id}`, files)
      .subscribe({
        next: () => {
          this.router.navigate([`/hotels/details/${id}`]);
        },
      });
  }

  likeHotel(id: string) {
    return this.http.put(this.apiUrl + `hotels/details/like/${id}`, id);
  }

  getLikedHotels() {
    return this.http.get<IHotel>(this.apiUrl + 'hotels/likes');
  }

  search(searchData: ISearch) {
    this.searchDataSubscription = this.http
      .post(this.apiUrl + 'hotels/search', searchData)
      .subscribe({
        next: (data) => {
          this._searchData.next(data);
          this.router.navigate(['/hotels/search']);
        },
      });
  }

  bookHotel(body: {}){
    console.log(body)
       this.http.post(this.apiUrl + 'hotels/reservation', body).subscribe((res) => {
        console.log(res)
       });
    }
    getReservations() {
      return this.http.get(this.apiUrl + 'hotels/reservations')
    }

  ngOnDestroy(): void {
    this.searchDataSubscription.unsubscribe();
    this.editDataSubscription.unsubscribe();
    this.deleteHotelSubscription.unsubscribe();
  }
}
