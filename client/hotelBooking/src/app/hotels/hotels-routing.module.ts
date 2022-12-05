import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddHotelComponent } from './add-hotel/add-hotel.component';
import { AllHotelsComponent } from './all-hotels/all-hotels.component';

const routes: Routes = [
  {
    path: 'all-hotels',
    component: AllHotelsComponent
  },
  {
    path: 'add-hotel',
    component: AddHotelComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HotelsRoutingModule { }
