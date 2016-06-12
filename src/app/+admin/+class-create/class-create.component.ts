import { Component, OnInit } from '@angular/core';
import { AngularFire } from 'angularfire2';
import { Router } from '@angular/router';

@Component({
  moduleId: module.id,
  selector: 'app-class-create',
  templateUrl: 'class-create.component.html',
  styleUrls: ['class-create.component.css']
})
export class ClassCreateComponent implements OnInit {

  constructor(public af: AngularFire,
    private router: Router) {
  }

  ngOnInit() {
  }

  save(id, name, strength, intelligence, agility){
      let that = this;
      this.af.database.list("/classes").push({id: id, name: name, strength: strength, intelligence: intelligence, agility: agility}).then(function(res){
        that.router.navigate(['/admin']);
      });
  }

}
