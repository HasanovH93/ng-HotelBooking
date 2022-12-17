import { IHotel } from "./hotel";


export interface IBookings{
    _id: string,
    checkIn: string,
    checkOut: string,
    guests: string,
    hotel: IHotel
}