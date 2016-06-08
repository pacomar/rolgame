import { Component, OnInit } from '@angular/core';
import { AngularFire } from 'angularfire2';
import { Router, ROUTER_DIRECTIVES} from '@angular/router';

@Component({
  moduleId: module.id,
  selector: 'app-login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.css'],
  directives: [ROUTER_DIRECTIVES]
})
export class LoginComponent implements OnInit {
  logued: boolean;
  error: string;
  constructor(public af: AngularFire,
    private router: Router) {
    this.af.auth.subscribe(auth => this.logued = auth != undefined);
  }

  ngOnInit() {
    if(this.logued){
      this.router.navigate(["/character"]);
    }
  }
  
  login(email, pass) {
    this.af.auth.login({ email: email, password: pass }).then(res => this.router.navigate(["/character"])).catch(err => this.error= err);
  }
}
