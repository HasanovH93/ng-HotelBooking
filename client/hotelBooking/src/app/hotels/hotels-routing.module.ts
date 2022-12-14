import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddHotelComponent } from './add-hotel/add-hotel.component';
import { AllHotelsComponent } from './all-hotels/all-hotels.component';
import { DetailsViewComponent } from './details-view/details-view.component';
import { EditHotelComponent } from './edit-hotel/edit-hotel.component';

const routes: Routes = [
  {
    path: 'all-hotels',
    component: AllHotelsComponent
  },
  {
    path: 'add-hotel',
    component: AddHotelComponent
  },
  {
    path: 'details/:id',
    component: DetailsViewComponent
  },
  {
    path: 'edit/:id',
    component:EditHotelComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HotelsRoutingModule { }
