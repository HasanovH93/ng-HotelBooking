import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllHotelsComponent } from './all-hotels/all-hotels.component';

const routes: Routes = [
  {
    path: 'hotels',
    component: AllHotelsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HotelsRoutingModule { }
