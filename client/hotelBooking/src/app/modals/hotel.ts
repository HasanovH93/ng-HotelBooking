export interface IHotel {
_id:string;
hotelName: string;
roomType:string;
location:string;
stars:number;
price: number;
imageUrls: string[]
description:string;
owner:string;
}

export interface IHotelDto{
    latestHotels: IHotel[]
}

export interface IAllHotels {
    message: string;
    data: IHotel[];
    total_pages: number;
    total_results: number;
  }