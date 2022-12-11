import { Component, OnInit } from '@angular/core';
import { faStar } from '@fortawesome/free-regular-svg-icons';
import { faHome } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-details-view',
  templateUrl: './details-view.component.html',
  styleUrls: ['./details-view.component.scss']
})
export class DetailsViewComponent implements OnInit {
faStar = faStar
faHome = faHome
  constructor() { }

  ngOnInit(): void {
  }

}
