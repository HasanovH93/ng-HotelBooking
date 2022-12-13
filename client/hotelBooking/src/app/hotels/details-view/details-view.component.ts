import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import { faStar } from '@fortawesome/free-regular-svg-icons';
import { IHotel } from 'src/app/modals/hotel';
import { HotelService } from 'src/app/services/hotel.service';
import { UserService } from 'src/app/services/user.service';
import { facilities } from '../facilities';

@Component({
  selector: 'app-details-view',
  templateUrl: './details-view.component.html',
  styleUrls: ['./details-view.component.scss'],
})
export class DetailsViewComponent implements OnInit {
  @ViewChild('content', { static: true }) el!: ElementRef<HTMLImageElement>;

  faStar = faStar;
  hotel!: IHotel;
  userId!: string | null;
  isOwner: boolean = false;
  facilitiesDataArray: Array<any> = [];

  constructor(
    private hotelService: HotelService,
    private actRoute: ActivatedRoute,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.actRoute.params.subscribe(({ id }) => {
      this.getHotel(id);
    });
  }

  private getHotel(id: string) {
    this.hotelService.getHotelById(id).subscribe((hotel) => {
      this.hotel = hotel;
      const facilitiesArray = hotel.facilities[0].split(',');
      for (let facility of facilitiesArray) {
        const singleFacilityObject = this.getFacilityData(facility);
        this.facilitiesDataArray.push(singleFacilityObject);
      }

      this.userId = this.userService.getUserId();
      if (hotel.owner == this.userId) {
        this.isOwner = true;
      }
    });
  }

  private getFacilityData(facility: any) {
    return facilities().find((item: any) => item.name === facility);
  }

  exportAsPdf() {
    html2canvas(this.el.nativeElement, { useCORS: true }).then((canvas) => {
      const imgData = canvas.toDataURL('image/jpeg');
      const pdf = new jsPDF({
        orientation: 'portrait',
      });
      const imgProps = pdf.getImageProperties(imgData);
      const pdfw = pdf.internal.pageSize.getWidth();
      const pdfh = (imgProps.height * pdfw) / imgProps.width;

      pdf.addImage(imgData, 'JPEG', 0, 0, pdfw, pdfh);
      pdf.save('booking.pdf');
    });
  }
}
