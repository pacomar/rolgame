import { Component, OnInit } from '@angular/core';
import { AngularFire, FirebaseObjectObservable, FirebaseAuthState } from 'angularfire2';
import { Router } from '@angular/router';

@Component({
  moduleId: module.id,
  selector: 'app-character',
  templateUrl: 'character.component.html',
  styleUrls: ['character.component.css']
})
export class CharacterComponent implements OnInit {
  user: FirebaseAuthState;
  character: FirebaseObjectObservable<any>;
  constructor(public af: AngularFire,
    private router: Router) {
    this.af.auth.subscribe(function(auth){
      if(auth != undefined){
        this.user = auth;
        this.character = this.af.database.object('/characters/' + this.user.uid );
        this.character.subscribe(function(snapshot){
          this.character = snapshot;
        });
      }else{
        this.router.navigate(["/login"]);
      }
    });
  }

  ngOnInit() { }

}
