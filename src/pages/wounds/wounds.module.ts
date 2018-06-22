import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { WoundsPage } from './wounds';

@NgModule({
  declarations: [
    WoundsPage,
  ],
  imports: [
    IonicPageModule.forChild(WoundsPage),
  ],
})
export class WoundsPageModule {}
