import { Component,OnInit } from '@angular/core';
import { AngularFire } from 'angularfire2';
import { CharacterComponent } from './+character';
import { Router, Routes, ROUTER_DIRECTIVES, ROUTER_PROVIDERS} from '@angular/router';
import { RegisterComponent } from './+register';
import { LoginComponent } from './+login';
import { ProfileComponent } from './+profile';

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
  {path: '/profile', component: ProfileComponent}
])
export class RolGameAppComponent  implements OnInit {
  logued: boolean;
  constructor(public af: AngularFire,
    private router: Router) {
    this.af.auth.subscribe(auth => this.logued = auth != undefined);
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