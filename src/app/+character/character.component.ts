import { Component, OnInit } from '@angular/core';
import { Routes, ROUTER_DIRECTIVES } from '@angular/router';
import { CreateComponent } from './+create';
import { DetailComponent } from './+detail';

@Component({
  moduleId: module.id,
  selector: 'app-character',
  templateUrl: 'character.component.html',
  styleUrls: ['character.component.css'],
  directives: [ROUTER_DIRECTIVES]
})
@Routes([
  {path: '/create', component: CreateComponent},
  {path: '/detail', component: DetailComponent},
  {path: '/', component: DetailComponent}
])
export class CharacterComponent implements OnInit {
  constructor() { }

  ngOnInit() { }

}
