import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './core/components';
import { AuthCallbackComponent, LoginComponent } from './core/auth';


const routes: Routes = [
  { path: 'auth/callback', component: AuthCallbackComponent },
  {
    path: "home",
    component: HomeComponent
  },
  {
    path: "",
    component: LoginComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
