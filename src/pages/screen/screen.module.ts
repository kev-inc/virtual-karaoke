import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ScreenPage } from './screen';

@NgModule({
  declarations: [
    ScreenPage,
  ],
  imports: [
    IonicPageModule.forChild(ScreenPage),
  ],
})
export class ScreenPageModule {}
