import * as moment from 'moment'
import { EventEmitter } from '@angular/core';


export class ClockService {
  editTime = new EventEmitter()
  add = new EventEmitter()
  private interval = null
  private time: string = moment().format('hh:mm:ss');
  
  private editMode = function* editMode(){
    yield {'h':{startPos:0,endPos:2}}
    yield {'m':{startPos:3,endPos:5}}
    yield {'s':{startPos:6,endPos:8}}
  }
  private mode = this.editMode()
  
  private update(){
    this.time = moment(this.time, "hh:mm:ss").add(1,'s').format('hh:mm:ss');
  }

  constructor(){
    this.interval = setInterval(()=>this.update(),1000)
  }
  
  edit() {
    let next = this.mode.next().value
    if(next){
      return next
    }else{
      this.mode = this.editMode()
      next = this.mode.next().value
      return next
    }
  }
  save(time){
    
    this.mode = this.editMode()
    if(moment(time, "hh:mm:ss").isValid())
      this.time = moment(time, "hh:mm:ss").format('hh:mm:ss');
    return this.time
  }
  getTime () {
    return this.time
  }
}