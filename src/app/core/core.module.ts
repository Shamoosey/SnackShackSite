import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CORE_COMPONENTS } from './components';
import { CommonModule } from '@angular/common';
import { CORE_CONTAINERS } from './containers';
import { EffectsModule } from '@ngrx/effects';
import { ShackEffects } from './data/store/shack.effects';
import { shackReducer, SHACK_FEATURE_KEY } from './data/store/shack.reducer';
import { StoreModule } from '@ngrx/store';
import { UserService } from './data/services';
import { MaterialModule } from '../material.module';
import { BrowserModule } from '@angular/platform-browser';
import { SharedModule } from '../shared/shared.module';
import { AUTH_COMPONENTS } from './auth';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { AppRoutingModule } from '../app-routing.module';

@NgModule({
  declarations: [
    ...CORE_COMPONENTS,
    ...CORE_CONTAINERS,
    ...AUTH_COMPONENTS
  ],
  imports: [
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserModule,
    MaterialModule,
    RouterModule,
    SharedModule,
    CommonModule,
    EffectsModule.forFeature(ShackEffects),
    StoreModule.forFeature(SHACK_FEATURE_KEY, shackReducer),
  ],
  providers: [
    provideHttpClient(withInterceptorsFromDi()),
    provideAnimations(),
    UserService
  ],
  exports: [
    ...CORE_COMPONENTS,
    ...CORE_CONTAINERS,
    ...AUTH_COMPONENTS
  ]
})
export class CoreModule { }
