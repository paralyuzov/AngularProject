import { NgModule } from '@angular/core';
import { CoreModule } from './core/core.module';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserModule } from './user/user.module';
import { ErrorComponent } from './error/error.component';
import { appInterceptorProvider } from './user/app.interceptor';
import { AuthenticateComponent } from './authenticate/authenticate.component';
import { LoaderComponent } from './shared/loader/loader.component';



@NgModule({
  declarations: [
    AppComponent,
    ErrorComponent,
    AuthenticateComponent,
    LoaderComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    CoreModule,
    UserModule,
    AppRoutingModule,
  ],
  providers: [appInterceptorProvider],
  bootstrap: [AppComponent]
})
export class AppModule { }
