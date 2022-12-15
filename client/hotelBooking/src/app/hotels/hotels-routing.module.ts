import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../user/auth.guard';
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
    component: AddHotelComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'details/:id',
    component: DetailsViewComponent
  },
  {
    path: 'edit/:id',
    component:EditHotelComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HotelsRoutingModule { }
