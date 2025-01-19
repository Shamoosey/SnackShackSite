import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthCallbackComponent, LoginComponent } from './core/data/auth';
import { AuthGuard } from './core/data/auth/auth-guard/AuthGuard';
import { HomeContainer } from './core/containers';


const routes: Routes = [
  { 
    path: 'auth/callback', 
    component: AuthCallbackComponent 
  },
  {
    path: "login",
    component: LoginComponent
  },
  {
    path: "**",
    component: HomeContainer,
    canActivate: [AuthGuard],
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
