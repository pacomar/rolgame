import { Component, OnInit } from '@angular/core';
import { CreateComponent } from './+create';
import { RaceCreateComponent } from './+race-create';
import { Routes , Router, ROUTER_DIRECTIVES } from '@angular/router';
import { AngularFire, FirebaseAuthState, FirebaseObjectObservable } from 'angularfire2';

@Component({
  moduleId: module.id,
  selector: 'app-admin',
  templateUrl: 'admin.component.html',
  styleUrls: ['admin.component.css'],
  directives: [ROUTER_DIRECTIVES]
})
@Routes([
  {path: '/create', component: CreateComponent},
  {path: '/race-create', component: RaceCreateComponent}

])
export class AdminComponent implements OnInit {
  user: FirebaseAuthState;
  user_info: FirebaseObjectObservable<any>;
  constructor(public af: AngularFire,
    public router: Router) {
    let that = this;
    this.af.auth.subscribe(function(auth){
      if(auth != undefined){
        that.user = auth;
        that.user_info = af.database.object('/users/' + that.user.uid );
        that.user_info.subscribe(function(res){
          if(res.admin){
            that.user_info = res;            
          }else{
            this.router.navigate(["/character"]);
          }
        });  
    }else{
        this.router.navigate(["/login"]);
      }
    });
  }

  ngOnInit() {
  }

}
