import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { LocalSimulationComponent } from './localsimulation.component';

@NgModule({
  imports: [ CommonModule, FormsModule, IonicModule, RouterModule],
  declarations: [LocalSimulationComponent],
  exports: [LocalSimulationComponent]
})
export class LocalSimulationComponentModule {}
