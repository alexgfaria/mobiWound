import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GiroscopioPage } from './giroscopio';

@NgModule({
  declarations: [
    GiroscopioPage,
  ],
  imports: [
    IonicPageModule.forChild(GiroscopioPage),
  ],
})
export class GiroscopioPageModule {}
