import { Component, OnInit } from '@angular/core';
import { AngularFire } from 'angularfire2';
import { Router } from '@angular/router';

@Component({
  moduleId: module.id,
  selector: 'app-race-create',
  templateUrl: 'race-create.component.html',
  styleUrls: ['race-create.component.css']
})
export class RaceCreateComponent implements OnInit {

  constructor(public af: AngularFire,
    private router: Router) {
  }

  ngOnInit() {
  }

  save(id, name, strength, intelligence, agility){
      let that = this;
      this.af.database.list("/races").push({id: id, name: name, strength: strength, intelligence: intelligence, agility: agility}).then(function(res){
        that.router.navigate(['/admin']);
      });
  }
}
