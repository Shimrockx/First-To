import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SimulationPage } from './simulation.page';

const routes: Routes = [
  {
    path: '',
    component: SimulationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SimulationPageRoutingModule {}
