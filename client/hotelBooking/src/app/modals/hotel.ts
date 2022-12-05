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