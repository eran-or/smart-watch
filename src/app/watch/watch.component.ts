import { Component, OnInit, ViewChild} from '@angular/core'
import { ClockService } from '../clock.service'
import { timeout } from 'q';



@Component({
  selector:'app-watch',
  templateUrl:'./watch.component.html'
})
export class WatchComponent implements OnInit{
  ngIfEditMode = false
  
  @ViewChild('timeInput') timeInput: any
  private interval = null
  private timeout = null
  private time = null
  private mode = null
  constructor(private clock: ClockService ){
    this.interval = setInterval(()=>this.time = clock.getTime(),1000)
  }
  
  ngOnInit(){
    this.clock.add.subscribe((e)=>{
      if(this.ngIfEditMode){
        clearTimeout(this.timeout)
        clearInterval(this.interval)
        
        let el = this.timeInput.nativeElement.value.split(':')
        let i = (Object.keys(this.mode)[0]==='h')?0:(Object.keys(this.mode)[0]==='m')?1:2
        let n:any = 0
          n = el[i]*1+1
          if(n<10){
            n = "0"+n
          }
          el[i] = n
        this.timeInput.nativeElement.value = el.join(":")
        this.time = this.timeInput.nativeElement.value
        this.save()
      }
    })
    this.clock.editTime.subscribe((e)=>{
        this.ngIfEditMode = true
        let mode = this.clock.edit()
        if(this.timeout){
          clearTimeout(this.timeout)
        }
        setTimeout(()=>{
          clearInterval(this.interval)
          const el = this.timeInput.nativeElement
          el.focus()
          el.setSelectionRange(Object.values(mode)[0].startPos,Object.values(mode)[0].endPos)
          this.timeout = this.save()
        },400)
        this.mode = mode
      })
  }
  save = ()=> {
    this.timeout = setTimeout(()=>{
    this.time = this.clock.save(this.time)
    this.interval = setInterval(()=>this.time = this.clock.getTime(),1000)
    this.ngIfEditMode = false
  },10000)
  return this.timeout
}
  edit(e){
    clearTimeout(this.timeout)
    clearInterval(this.interval)
    this.save()
    let ptr = /^[0-9]|Backspace?$/g
    if(!ptr.test(e.key)){
      return false
    }
  }
  
  

}