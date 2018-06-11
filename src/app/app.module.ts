import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { Camera } from '@ionic-native/camera';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { CamaraPage } from '../pages/camara/camara';
import { PatientPage } from '../pages/patient/patient';
import { GiroscopioPage } from '../pages/giroscopio/giroscopio';
import { Gyroscope, GyroscopeOrientation} from '@ionic-native/gyroscope';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    CamaraPage,
    PatientPage,
    GiroscopioPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    CamaraPage,
    PatientPage,
    GiroscopioPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Camera,
    Gyroscope,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
