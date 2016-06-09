import { Component, OnInit } from '@angular/core';
import { AngularFire, FirebaseObjectObservable, FirebaseAuthState } from 'angularfire2';
import { Router , Routes , ROUTER_DIRECTIVES } from '@angular/router';
import { CreateComponent } from './+create';
import { DetailComponent } from './+detail';

@Component({
  moduleId: module.id,
  selector: 'app-character',
  templateUrl: 'character.component.html',
  styleUrls: ['character.component.css'],
  directives: [ROUTER_DIRECTIVES]
})
@Routes([
  {path: '/create', component: CreateComponent},
  {path: '/', component: DetailComponent}
])
export class CharacterComponent implements OnInit {
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

  ngOnInit() { }

}
