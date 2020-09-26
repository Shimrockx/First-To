import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SimulationPageRoutingModule } from './simulation-routing.module';

import { SimulationPage } from './simulation.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SimulationPageRoutingModule
  ],
  declarations: [SimulationPage]
})
export class SimulationPageModule {}
