import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeContainer } from './containers';
import { AuthCallbackComponent } from './components/auth-callback/auth-callback.component';
import { LoginComponent, MainComponent } from './components';

const routes: Routes = [
  { path: 'auth/callback', component: AuthCallbackComponent },
  {
    path: "home",
    component: MainComponent
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
