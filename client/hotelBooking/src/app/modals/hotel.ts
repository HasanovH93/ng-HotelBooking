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
facilities: string[];
}



export interface IHotelDto{
    latestHotels: IHotel[]
}

export interface ISHotel {
    data: IHotel
}



