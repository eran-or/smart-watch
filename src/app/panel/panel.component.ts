import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ClockService } from '../clock.service';

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.css']
})
export class PanelComponent implements OnInit {
  
  editMode: boolean = false
  private isTimer: boolean = false
  @Output() timer = new EventEmitter()
  private isTimerRunning: boolean = false

  constructor(private clock: ClockService) {}

  ngOnInit() {}

  onAction1(){
    if(this.isTimer){
      this.timer.emit("toggle")
    }else{
      this.clock.editTime.emit(event)
    }
  }
  onAction2(){
    if(this.isTimer){
      this.timer.emit("reset")
    }else{
      this.clock.add.emit(event)
    }
  }
  next(){
    this.isTimer = !this.isTimer
  }
}
