import { Injectable, Optional } from '@angular/core';
import { Storage } from '@ionic/storage';
import { ToastController } from '@ionic/angular';

export interface LocalSimulation {
  id: number;
  title: string;
  date: string;
  options: Option[];
}

export interface Option {
  input: string;
}

export interface Score {
  label: string;
  score: number;
}

@Injectable({
  providedIn: 'root'
})
export class DataService {
  public localSimulations: LocalSimulation[] = [];

  // Initialize with empty input for UI
  public options: Option[] = [
    {
      input: ""
    }
  ];
  
  public leaderboard: Score[] = [];

  constructor(
    private storage: Storage,
    public toastController: ToastController) { }

  /** =================
   *  Fetch/Set Methods
   *  ================= **/
  public async loadLocalSimulations() {
    await this.storage.get("LocalSimulations").then(async (data) => {
      if (data !== null) {
        this.localSimulations = data;
      }
    });
  }

  public saveLocalSimulation(id: number, title: string, options: Option[]) {
    let date = new Date();
    let localSimulation = this.getLocalSimulationById(id);

    // Creating new local simulation
    if (localSimulation === undefined) {

      let localSimulation = {
        id: id,
        title: title,
        date: date.toLocaleString(),
        options: options
      }

      this.localSimulations.push(localSimulation);

      this.saveToStorage();
      
    } 
    // Replacing local simulation
    else {

      localSimulation = {
        id: localSimulation.id,
        title: title,
        date: date.toLocaleString(),
        options: options,
      }

      // Fetch the local simulation with id
      for  (let i = 0; i < this.localSimulations.length; i++) {
        if (this.localSimulations[i].id === id) {
          this.localSimulations[i] = localSimulation;
        }
      }

      this.saveToStorage();

    }
  }

  public deleteLocalSimulation(id: number) {
    for  (let i = 0; i < this.localSimulations.length; i++) {
      if (this.localSimulations[i].id === id) {
        this.localSimulations.splice(i, 1);
      }
    }

    this.saveToStorage();
  }

  public getLocalSimulations(): LocalSimulation[] {
    return this.localSimulations;
  }

  public getOptions(): Option[] {
    return this.options;
  }

  public getLocalSimulationById(id: number): LocalSimulation {
    for  (let i = 0; i < this.localSimulations.length; i++) {
      if (this.localSimulations[i].id === id) {
        return this.localSimulations[i];
      }
    }
  }

  public getOptionById(id: number): Option[] {
    return this.localSimulations[id].options;
  }

  public createOptions(): Option[] {
    this.options = [
      {
        input: ""
      }
    ];

    return this.options;
  }

  /** ==============
   *  Action Methods
   *  ============== **/
  public addOption() {
    let option: Option = { input: "" };
    this.options.push(option);
  }

  public deleteOption(index) {
    this.options.splice(index, 1);
  }

  public simulationOption(firstTo): Score[] {
    this.leaderboard = [];
    const maxRange = this.getOptions().length;

    for (let i = 0; i < this.getOptions().length; i++) {
      let option = { input: "" };
      option = this.getOptions()[i];
      let optionScore: Score = { label: option.input, score: 0};
      this.leaderboard.push(optionScore);
    }

    while (!this.endOfMatch(firstTo)) {
      this.createOptionToLeaderboard(maxRange);
    }

    this.leaderboard.sort(this.scoreCompare);
    return this.leaderboard;
  }

  /** ===================
   *  Leaderboard Methods
   *  =================== **/
  private createOptionToLeaderboard(range) {
    let option = this.getOptions()[this.getRandomInt(range)];
    this.addScoreLeaderboard(option.input);
  }

  private addScoreLeaderboard(label: string) {
    for (let i = 0; i < this.leaderboard.length; i++) {
      if (this.leaderboard[i].label === label) {
        this.leaderboard[i].score += 1;
      }
    }
  }

  private endOfMatch(firstTo): boolean {
    let end = false;

    for (let i = 0; i < this.leaderboard.length; i++) {
      if (this.leaderboard[i].score === firstTo) {
        end = true;
        break;
      }
    }

    return end;
  }

  /** =============
   *  Toast Methods
   *  ============= **/
  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Your modifications have been saved.',
      duration: 2000
    });
    toast.present();
  }

  /** =============
   *  Utils Methods
   *  ============= **/
  private saveToStorage() {
    this.storage.set("LocalSimulations", this.localSimulations).then(() => {
      this.presentToast();
    }, error => {
      console.log(error);
    });
  }

  private getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }

  private scoreCompare( a, b ) {
    if ( a.score < b.score ){
      return 1;
    }
    if ( a.score > b.score ){
      return -1;
    }
    return 0;
  }
}