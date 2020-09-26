import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Score } from 'src/app/services/data.service';

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.page.html',
  styleUrls: ['./leaderboard.page.scss'],
})
export class LeaderboardPage implements OnInit {
  @Input() leaderboard: Score[];

  private speed = 3;

  constructor(
    private modalController: ModalController) { }

  ngOnInit() {
    this.showLeaderboard();
  }

  /** ============
   *  Show Methods
   *  ============ **/
  async showLeaderboard() {
    // Divide by the length to increase speed
    this.speed /= this.leaderboard.length;

    for (let i = 0; i < this.leaderboard.length; i++) {
      this.countNumberAnimation(this.leaderboard[i]);
    }
  }

  /** =================
   *  Animation Methods
   *  ================= **/
  countNumberAnimation(position: Score) {
    if (position.score > 0) {
      const maxScore = position.score;
      position.score = 0;

      // Setting an interval to simulate an animation
      let interval = setInterval(()=>{
        position.score++;
        if (position.score === maxScore) clearInterval(interval);
      }, this.speed);
    }
  }

  /** =============
   *  Modal Methods
   *  ============= **/
  dismiss() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalController.dismiss();
  }
}
