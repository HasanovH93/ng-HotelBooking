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
owner:string;
ownerEmail: string;
ownerImage: string;
facilities: string[];
likedBy: string[];
date:string
}



export interface IHotelDto{
    latestHotels: IHotel[]
}

export interface ISHotel {
    data: IHotel
}



export interface ISearch {
    location:string;
    stars: number;
    price: number;
}