import { Component } from '@angular/core';
import { DataService, LocalSimulation } from '../services/data.service';
import { ModalController, NavController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  constructor(
    private data: DataService,
    private navController: NavController,
    private loading: LoadingController,
    private modalController: ModalController) {}


  ngOnInit() {
    this.loadLocalSimulations();
  }

  refresh(ev) {
    setTimeout(() => {
      this.data.loadLocalSimulations();
      ev.detail.complete();
    }, 1500);
  }

  /** =================
   *  Fetch/Set Methods
   *  ================= **/
  async loadLocalSimulations() {
    const loading = await this.loading.create({
      message: 'Please wait...'
    });
    await loading.present();
    await this.data.loadLocalSimulations();
    await loading.dismiss();
  }

  getLocalSimulation(): LocalSimulation[] {
    return this.data.getLocalSimulations();
  }

  public newSimulation() {
    // Create new options array
    this.data.createOptions();

    if (this.data.getLocalSimulations() !== null) {
      let path: number = this.getLocalSimulation().length + 1;
      this.navController.navigateForward('simulation/' + path);
    } else {
      this.navController.navigateForward('simulation/1');
    }
  }

}
