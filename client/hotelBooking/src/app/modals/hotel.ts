export interface IHotel {
_id:string;
hotelName: string;
roomType:string;
location:string;
address: string;
stars:number;
price: number;
imageUrls: string[];
description:string;
owner:iOwner;
facilities: string[];
}

export interface iOwner {
    _id:string,
    email:string,
    username: string,

}

export interface IHotelDto{
    latestHotels: IHotel[]
}

