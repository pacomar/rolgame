import { Component, OnInit } from '@angular/core';
import { AngularFire } from 'angularfire2';
import { Router, ROUTER_DIRECTIVES } from '@angular/router';

@Component({
  moduleId: module.id,
  selector: 'app-register',
  templateUrl: 'register.component.html',
  styleUrls: ['register.component.css'],
  directives: [ROUTER_DIRECTIVES]
})
export class RegisterComponent implements OnInit {

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
  
  register(email, pass) {
    let that = this;
    this.af.auth.createUser({ email: email, password: pass }).then(function(res){
      that.af.database.object('/users/' + res.uid).set({name: email.replace(/@.*/, ''), admin: false});
      that.router.navigate(["/login"]);
    }).catch(err => this.error= err);
  }

}
