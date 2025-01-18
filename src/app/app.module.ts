import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { COMPONENTS } from './components';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { SHACK_FEATURE_KEY } from './data/store/shack.reducer';
import * as shackReducer from "./data/store/shack.reducer"
import { ShackEffects } from './data/store/shack.effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { UserService } from './data/services';

@NgModule({
  declarations: [
    AppComponent,
    ...COMPONENTS
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot({}, {}),
    EffectsModule.forRoot([]),
    StoreModule.forRoot({
    }),
    EffectsModule.forFeature([ShackEffects]),
    StoreModule.forFeature(shackReducer.SHACK_FEATURE_KEY, shackReducer.reducer),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() })
  ],
  providers: [
    UserService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
