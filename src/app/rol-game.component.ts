import { Component,OnInit } from '@angular/core';
import { AngularFire, FirebaseAuthState } from 'angularfire2';
import { CharacterComponent } from './+character';
import { Router, Routes, ROUTER_DIRECTIVES, ROUTER_PROVIDERS} from '@angular/router';
import { RegisterComponent } from './+register';
import { LoginComponent } from './+login';
import { ProfileComponent } from './+profile';
import { AdminComponent } from './+admin';

@Component({
  moduleId: module.id,
  selector: 'rol-game-app',
  templateUrl: 'rol-game.component.html',
  styleUrls: ['rol-game.component.css'],
  directives: [ROUTER_DIRECTIVES],
  providers: [ROUTER_PROVIDERS]
})
@Routes([
  {path: '/character', component: CharacterComponent},
  {path: '/register', component: RegisterComponent},
  {path: '/login', component: LoginComponent},
  {path: '/profile', component: ProfileComponent},
  {path: '/admin', component: AdminComponent}


])
export class RolGameAppComponent  implements OnInit {
  logued: boolean;
  user: FirebaseAuthState;
  constructor(public af: AngularFire,
    public router: Router) {
    let that = this;
    this.af.auth.subscribe(function(auth){
      that.logued = auth != undefined;
      that.user = auth;
    });
  }

  ngOnInit() {
    if(!this.logued){
      this.router.navigate(["/login"]);
    }
  }

  logout() {
    this.af.auth.logout();
    this.router.navigate(["/login"]);
  }
}