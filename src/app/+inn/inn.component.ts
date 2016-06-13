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

  takeARest(min: number, gold: number) {
    let actual = new Date().getTime();
    /*if(this.character.busy < actual){
        // update character
    }*/
  }

}
