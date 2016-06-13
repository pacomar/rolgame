import { Component, OnInit } from '@angular/core';
import { AngularFire, FirebaseObjectObservable, FirebaseAuthState, FirebaseListObservable } from 'angularfire2';
import { Router } from '@angular/router';

@Component({
  moduleId: module.id,
  selector: 'app-create',
  templateUrl: 'create.component.html',
  styleUrls: ['create.component.css']
})
export class CreateComponent implements OnInit {
  user: FirebaseAuthState;
  character: FirebaseObjectObservable<any>;
  races: any[];
  classes: any[];
  constructor(public af: AngularFire,
    private router: Router) {
    let that = this;
    this.af.auth.subscribe(function(auth){
      if(auth != undefined){
        that.user = auth;
        that.character = af.database.object('/characters/' + that.user.uid );
        that.character.subscribe(function(snapshot){
          if(snapshot != null){
            that.router.navigate(["/character"]);
          }else{
            af.database.list('/races').subscribe(res => that.races = res);
            af.database.list('/classes').subscribe(res => that.classes = res);
          }
        });
      }else{
        that.router.navigate(["/login"]);
      }
    });
  }

  ngOnInit() { }

  save(name: string, race: string, nclass: string) {
    let nRace = this.races.find(x => x.id === race);
    let nClass = this.classes.find(x => x.id === nclass);
    this.character.set({ name: name, race: race, class: nclass, level: 1, experience: 1, base_life: 100, actual_life: 50, gold: 100, busy: new Date().getTime(), busy_place: "inn",
      strength: parseInt(nRace.strength) + parseInt(nClass.strength),
      intelligence: parseInt(nRace.intelligence) + parseInt(nClass.intelligence),
      agility: parseInt(nRace.agility) + parseInt(nClass.agility) });
    this.router.navigate(["/character"]);
  }

}
