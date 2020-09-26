import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { DataService, Option, Score } from '../services/data.service';
import { LeaderboardPage } from '../modal/leaderboard/leaderboard.page';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-simulation',
  templateUrl: './simulation.page.html',
  styleUrls: ['./simulation.page.scss'],
})
export class SimulationPage implements OnInit {
  public firstTo: number = 1;
  private maxFirstTo: number = 1000001;

  constructor(
    private data: DataService,
    private activatedRoute: ActivatedRoute,
    private modalController: ModalController) { }

  ngOnInit() {
    const routeId = this.activatedRoute.snapshot.paramMap.get('id');
    this.loadSimulation(Number(routeId));
  }

  /** =================
   *  Fetch/Set Methods
   *  ================= **/
  private async loadSimulation(id: number) {
    await this.data.loadLocalSimulations();
    if (this.data.getLocalSimulations() !== null) {
      let localSimulation = this.data.getLocalSimulationById(id);
      
      if (localSimulation !== undefined) {
        this.data.options = localSimulation.options;

      }
    }
  }

  public saveSimulation() {
    const routeId = this.activatedRoute.snapshot.paramMap.get('id');
    let options = this.data.getOptions();
    this.data.saveLocalSimulation(Number(routeId), options[0].input, options);
  }

  public getOptions(): Option[] {
    return this.data.getOptions();
  }

  /** ==============
   *  Action Methods
   *  ============== **/
  public addOption() {
    this.data.addOption();
  }

  public deleteOption(index) {
    this.data.deleteOption(index);
  }

  public simulationOption() {
    if (this.firstTo < this.maxFirstTo) {
      const leaderboard: Score[] = this.data.simulationOption(this.firstTo);
      this.presentLeaderboardModal(leaderboard);
    }
  }

  /** =============
   *  Check Methods
   *  ============= **/
  public checkDeleteOption(index): boolean {
    if (index == 0) {
      return false;
    } else {
      return true;
    }
  }

  public checkInput(event) {
    if (event !== "") {
      this.checkAddOption();
      this.checkSimulateOption();
    }
  }

  public checkAddOption(): boolean {
    for (let i = 0; i < this.getOptions().length; i++) {
      if (this.getOptions()[i].input !== "") {
        return false;
      } else {
        return true;
      }
    }
  }

  public checkSimulateOption(): boolean {
    const minOption = 2;
    let actualOption = 0;

    for (let i = 0; i < this.getOptions().length; i++) {
      if (this.getOptions()[i].input !== "") {
        actualOption += 1
      }
    }

    if (actualOption >= minOption && this.firstTo < this.maxFirstTo) {
      return false;
    } else {
      return true;
    }
  }

  /** =============
   *  Modal Methods
   *  ============= **/
  public async presentLeaderboardModal(leaderboard: Score[]) {
    const modal = await this.modalController.create({
      component: LeaderboardPage,
      componentProps: {
        leaderboard
      }
    });
    return await modal.present();
  }

  public getBackButtonText() {
    const win = window as any;
    const mode = win && win.Ionic && win.Ionic.mode;
    return mode === 'ios' ? 'First To' : '';
  }
}
