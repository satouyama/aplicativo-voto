import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { RestService } from './providers/rest/rest';
import { ValidateRequestService } from './providers/validate/validate-request.service';
import { AuthenticationService } from './providers/auth/authentication.service';
import { AuthGuard } from './providers/auth/auth.guard';
import { IonicStorageModule } from '@ionic/storage';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { UploadService } from './providers/upload/upload.service';
import { Camera } from '@ionic-native/camera/ngx';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { FileSelectDirective, FileUploader, FileUploadModule } from 'ng2-file-upload';
import { Facebook } from '@ionic-native/facebook/ngx';
import { GooglePlus } from '@ionic-native/google-plus/ngx'
import { SocialService } from './providers/social/social.service';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [
    // FileSelectDirective
  ],
  imports: [
    HttpClientModule,
    BrowserModule, 
    IonicModule.forRoot({
      mode: 'md'
    }), 
    AppRoutingModule,
    IonicStorageModule.forRoot(),
    // FileUploadModule
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    StatusBar,
    SplashScreen,
    SocialService,
    RestService,
    AuthenticationService,
    AuthGuard,

    Facebook,
    GooglePlus,
    SocialSharing,
    Camera,
    UploadService,

    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    { provide: HTTP_INTERCEPTORS, useClass: ValidateRequestService, multi: true }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
