import { Component, OnInit } from '@angular/core';
import { AngularFire, FirebaseObjectObservable, FirebaseAuthState, FirebaseListObservable } from 'angularfire2';
import { Router, ROUTER_DIRECTIVES } from '@angular/router';

@Component({
  moduleId: module.id,
  selector: 'app-detail',
  templateUrl: 'detail.component.html',
  styleUrls: ['detail.component.css'],
  directives: [ROUTER_DIRECTIVES]
})
export class DetailComponent implements OnInit {
  user: FirebaseAuthState;
  character: FirebaseObjectObservable<any>;
  constructor(public af: AngularFire,
    private router: Router) {
    let that = this;
    this.af.auth.subscribe(function(auth){
      if(auth != undefined){
        that.user = auth;
        that.character = af.database.object('/characters/' + that.user.uid );
        that.character.subscribe(function(snapshot){
          if(snapshot != null){
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

}
