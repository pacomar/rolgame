import { Component,OnInit } from '@angular/core';
import { AngularFire, FirebaseAuthState, FirebaseObjectObservable } from 'angularfire2';
import { CharacterComponent } from './+character';
import { Router, Routes, ROUTER_DIRECTIVES, ROUTER_PROVIDERS} from '@angular/router';
import { RegisterComponent } from './+register';
import { LoginComponent } from './+login';
import { ProfileComponent } from './+profile';
import { AdminComponent } from './+admin';
import { InnComponent } from './+inn';
import { QuestComponent } from './+quest';

@Component({
  moduleId: module.id,
  selector: 'rol-game-app',
  templateUrl: 'rol-game.component.html',
  styleUrls: ['rol-game.component.css'],
  directives: [ROUTER_DIRECTIVES],
  providers: [ROUTER_PROVIDERS]
})
@Routes([
  {path: '/', component: CharacterComponent},
  {path: '/character', component: CharacterComponent},
  {path: '/register', component: RegisterComponent},
  {path: '/login', component: LoginComponent},
  {path: '/profile', component: ProfileComponent},
  {path: '/admin', component: AdminComponent},
  {path: '/inn', component: InnComponent},
  {path: '/quest', component: QuestComponent}


])
export class RolGameAppComponent  implements OnInit {
  logued: boolean;
  is_admin: boolean;
  user: FirebaseAuthState;
  user_info: FirebaseObjectObservable<any>;
  constructor(public af: AngularFire,
    public router: Router) {
    let that = this;
    this.af.auth.subscribe(function(auth){
      if(auth != undefined){
        that.user = auth;
        that.logued = true;
        that.user_info = af.database.object('/users/' + that.user.uid );
        that.user_info.subscribe(function(res){
          that.is_admin = res.admin;
          that.user_info = res;
        });
    }else{
        that.logued = false;
        that.router.navigate(["/login"]);
      }
    });
  }

  ngOnInit() { }

  logout() {
    this.af.auth.logout();
    this.router.navigate(["/login"]);
  }
}