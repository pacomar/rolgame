import { Component, OnInit } from '@angular/core';
import { CreateComponent } from './+create';
import { Routes , ROUTER_DIRECTIVES } from '@angular/router';

@Component({
  moduleId: module.id,
  selector: 'app-admin',
  templateUrl: 'admin.component.html',
  styleUrls: ['admin.component.css'],
  directives: [ROUTER_DIRECTIVES]
})
@Routes([
  {path: '/create', component: CreateComponent}
])
export class AdminComponent implements OnInit {

  constructor() {}

  ngOnInit() {
  }

}
