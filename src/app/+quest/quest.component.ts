import { Component, OnInit } from '@angular/core';
import { AngularFire, FirebaseObjectObservable, FirebaseAuthState } from 'angularfire2';
import { Router, ROUTER_DIRECTIVES } from '@angular/router';

@Component({
  moduleId: module.id,
  selector: 'app-quest',
  templateUrl: 'quest.component.html',
  styleUrls: ['quest.component.css'],
  directives: [ROUTER_DIRECTIVES]
})
export class QuestComponent implements OnInit {
  user: FirebaseAuthState;
  character: FirebaseObjectObservable<any>;
  actual: number;
  busy: boolean;
  actual_time: number;
  gold: number;
  experience: number;
  actual_life: number;
  base_life: number;
  maxExperience: any;
  level: number;
  agility: number;
  intelligence: number;
  strength: number;
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
            that.experience = snapshot.experience;
            that.actual_life = snapshot.actual_life;
            that.base_life = snapshot.base_life;
            that.level = snapshot.level;
            that.agility = snapshot.agility;
            that.intelligence = snapshot.intelligence;
            that.strength = snapshot.strength;
            that.character = snapshot;
            that.maxExperience = af.database.object('/levels/' + ( parseInt(snapshot.level) + 1) );
            that.maxExperience.subscribe(res => that.maxExperience = res);
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

  doAQuest(min: number) {
    if(this.actual_life > 0){
      let actual = new Date().getTime();
      let prox = new Date(actual + min*60000).getTime();
      let life_spent = Math.floor((Math.random() * this.base_life) + 1);
      let act_exp = this.experience + Math.floor((Math.random() * (min * 5)) + 1);
      if(!this.busy){
        if(life_spent > this.actual_life){
          this.af.database.object('/characters/' + this.user.uid ).update({busy: prox, busy_place: "quest", actual_life: 0});
        }else{
          if(act_exp > this.maxExperience ){
            this.level +=1;
            this.agility += Math.floor((Math.random() * (Math.floor(this.agility / 10) + 1)) + 1);
            this.intelligence += Math.floor((Math.random() * (Math.floor(this.intelligence / 10) + 1)) + 1);
            this.strength += Math.floor((Math.random() * (Math.floor(this.strength /10 ) + 1)) + 1);
          }
          this.af.database.object('/characters/' + this.user.uid ).update({busy: prox, busy_place: "quest",
            gold: this.gold + Math.floor((Math.random() * (min * 5)) + 1),
            actual_life: this.actual_life - life_spent,
            experience: act_exp,
            level: this.level,
            agility: this.agility,
            intelligence: this.intelligence,
            strength: this.strength
          });
        }
        this.router.navigate(["/quest"]);
      }
    }else{
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