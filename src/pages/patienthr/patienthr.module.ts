import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PatienthrPage } from './patienthr';

@NgModule({
  declarations: [
    PatienthrPage,
  ],
  imports: [
    IonicPageModule.forChild(PatienthrPage),
  ],
})
export class PatienthrPageModule {}
