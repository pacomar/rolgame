import { Component, OnInit } from '@angular/core';
import { AngularFire, FirebaseObjectObservable, FirebaseAuthState } from 'angularfire2';
import { Router, ROUTER_DIRECTIVES } from '@angular/router';

@Component({
  moduleId: module.id,
  selector: 'app-inn',
  templateUrl: 'inn.component.html',
  styleUrls: ['inn.component.css'],
  directives: [ROUTER_DIRECTIVES]
})
export class InnComponent implements OnInit {
  user: FirebaseAuthState;
  character: FirebaseObjectObservable<any>;
  actual: number;
  busy: boolean;
  gold: number;
  actual_life: number;
  base_life: number;
  actual_time: number;
  constructor(public af: AngularFire,
    private router: Router) {
    let that = this;
    this.af.auth.subscribe(function(auth){
      if(auth != undefined){
        that.user = auth;
        that.character = af.database.object('/characters/' + that.user.uid );
        that.character.subscribe(function(snapshot){
          if(snapshot != null){
            that.actual = new Date().getTime();
            that.busy = snapshot.busy > that.actual;
            that.actual_time = 0;
            if(that.busy){
              that.actual_time = Math.round((snapshot.busy - that.actual) / 1000);
              that.countdown();
            }
            that.gold = snapshot.gold;
            that.actual_life = snapshot.actual_life;
            that.base_life = snapshot.base_life;
            that.character = snapshot;
          }else{
            that.router.navigate(["/character/create"]);
          }
        });
      }else{
        that.router.navigate(["/login"]);
      }
    });
  }

  ngOnInit() {
  }

  takeARest(min: number, gold: number, life: number) {
    let actual = new Date().getTime();
    let prox = new Date(actual + min*60000).getTime();
    let final_life = this.actual_life + life;
    if(!this.busy){
      if(final_life > this.base_life){
        final_life = this.base_life
      }
      this.af.database.object('/characters/' + this.user.uid ).update({busy: prox, busy_place: "inn", gold: this.gold - gold, actual_life: final_life});
      this.router.navigate(["/inn"]);
    }
  }

  private countdown(){
    let that = this;
    let refreshIntervalId = setInterval(function(){ 
      that.actual_time -= 1;
      if(that.actual_time <= 0){
        clearInterval(refreshIntervalId);
        that.router.navigate(["/inn"]);
      }
    }, 1000);
  }

}
