import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HotelsModule } from './hotels/hotels.module';
import { PageNotFoundComponent } from './shared/page-not-found/page-not-found.component';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./user/user.module').then((m) => m.UserModule)
  },
  {
    path: 'hotels',
    loadChildren: () => import('./hotels/hotels.module').then((m) => m.HotelsModule)

  },
  {
    path: '',
    loadChildren: () => import('./home/home.module').then((m) => m.HomeModule)
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
