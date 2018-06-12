import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { Camera } from '@ionic-native/camera';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { PatientListPage } from '../pages/patient-list/patient-list';
import { CamaraPage } from '../pages/camara/camara';
import { PatienthrPage } from '../pages/patienthr/patienthr';
import { Gyroscope, GyroscopeOrientation} from '@ionic-native/gyroscope';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    CamaraPage,
    PatientListPage,
    PatienthrPage
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
    PatientListPage,
    PatienthrPage
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
