import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { WoundsListPage } from './wounds-list';

@NgModule({
  declarations: [
    WoundsListPage,
  ],
  imports: [
    IonicPageModule.forChild(WoundsListPage),
  ],
})
export class WoundsListPageModule {}
