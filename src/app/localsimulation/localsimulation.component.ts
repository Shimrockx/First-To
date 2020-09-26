import { Component, OnInit, Input } from '@angular/core';
import { DataService, LocalSimulation } from '../services/data.service';

@Component({
  selector: 'app-local-simulation',
  templateUrl: './localsimulation.component.html',
  styleUrls: ['./localsimulation.component.scss'],
})
export class LocalSimulationComponent implements OnInit {
  @Input() localSimulation: LocalSimulation;

  constructor(private data: DataService) { }

  ngOnInit() {}

  isIos() {
    const win = window as any;
    return win && win.Ionic && win.Ionic.mode === 'ios';
  }

  deleteLocalSimulation(id: number) {
    this.data.deleteLocalSimulation(id);
  }
}
