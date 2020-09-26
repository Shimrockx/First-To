import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';

import { HomePage } from './home.page';
import { HomePageRoutingModule } from './home-routing.module';
import { LocalSimulationComponentModule } from '../localsimulation/localsimulation.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LocalSimulationComponentModule,
    HomePageRoutingModule
  ],
  declarations: [HomePage]
})
export class HomePageModule {}
