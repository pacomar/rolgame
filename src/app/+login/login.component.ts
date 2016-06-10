import { Component, OnInit } from '@angular/core';
import { AngularFire } from 'angularfire2';
import { Router, ROUTER_DIRECTIVES } from '@angular/router';

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
      let that = this;
    this.af.auth.subscribe(function(auth){
      if(auth != undefined){
        that.router.navigate(["/character"]);
      }
    });
  }

  ngOnInit() { }
  
  login(email, pass) {
    let that = this;
    this.af.auth.login({ email: email, password: pass }).then(function(res){
      that.router.navigate(["/character"]);
    }).catch(err => this.error= err);
  }

  goToRegister(){
    this.router.navigate(["/register"]);
  }
}
