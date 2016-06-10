import { Component, OnInit } from '@angular/core';
import { AngularFire, FirebaseObjectObservable, FirebaseAuthState, FirebaseListObservable } from 'angularfire2';
import { Router } from '@angular/router';

@Component({
  moduleId: module.id,
  selector: 'app-race-create',
  templateUrl: 'race-create.component.html',
  styleUrls: ['race-create.component.css']
})
export class RaceCreateComponent implements OnInit {
  race: FirebaseObjectObservable<any>;
  constructor(public af: AngularFire,
    private router: Router) {
  }

  ngOnInit() {
  }

  save(name, strength, intelligence, agility){
      let that = this;
      this.af.database.list("/races").push({name: name, strength: strength, intelligence: intelligence, agility: agility}).then(function(res){
        that.router.navigate(['/admin']);
      });
  }

}
