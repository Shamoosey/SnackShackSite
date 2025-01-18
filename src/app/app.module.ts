import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { COMPONENTS } from './components';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as shackReducer from "./data/store/shack.reducer"
import { ShackEffects } from './data/store/shack.effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { UserService } from './data/services';
import { CONTAINERS } from './containers';
import { MaterialModule } from './material.module';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    ...COMPONENTS,
    ...CONTAINERS
  ],
  imports: [
    BrowserModule,
    MaterialModule,
    AppRoutingModule,
    EffectsModule.forRoot([ShackEffects]),
    StoreModule.forRoot(shackReducer.reducer),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() })
  ],
  providers: [
    provideHttpClient(withInterceptorsFromDi()),
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
