import { Component, OnInit, Input } from '@angular/core'
import { PanelComponent } from '../panel/panel.component'
import * as moment from 'moment'

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.css']
})
export class TimerComponent implements OnInit {
  
  private interval
  private duration = moment.duration({
    seconds: 2,
    minutes: 2,
    hours: 2,
  })
  timer = moment.utc(this.duration.asMilliseconds()).format("hh:mm:ss")
  private toggle: boolean = false
  @Input() panel: PanelComponent

  constructor() {}
  start = ()=>{
    this.interval = setInterval(()=>{
      this.duration.subtract(1000);
      this.timer = moment.utc(this.duration.asMilliseconds()).format("hh:mm:ss")
    },1000)
  }
  ngOnInit() {
    this.panel.timer.subscribe((e)=>{
      if(e==='toggle'){

        if(this.interval){
          this.interval = clearInterval(this.interval)
        }else{
          this.start()
        }
      }
      if(e==='reset'){
        if(this.interval){
          this.interval = clearInterval(this.interval)
        }
        this.duration = moment.duration({
          seconds: 2,
          minutes: 2,
          hours: 2,
        })
        this.timer = moment.utc(this.duration.asMilliseconds()).format("hh:mm:ss")
      }
    })
  }

}
