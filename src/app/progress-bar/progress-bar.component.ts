import { Component, OnInit, Input } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'app-progress-bar',
  templateUrl: 'progress-bar.component.html',
  styleUrls: ['progress-bar.component.css']
})
export class ProgressBarComponent implements OnInit {
  @Input() 
  minValue: number;
  @Input() 
  nowValue: number;
  @Input() 
  maxValue: number;
  @Input() 
  colorGreen: boolean;
  @Input() 
  colorBlue: boolean;
  @Input() 
  colorYellow: boolean;
  @Input() 
  colorRed: boolean;

  constructor() {}

  ngOnInit() { }

  calculatePercentage() {
    let a = this.nowValue;
    let b = this.maxValue;
    let c = a / b;
    let d = c * 100;
    return d + "%";
  }

}
