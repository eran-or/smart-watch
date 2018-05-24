import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { WatchComponent } from './watch/watch.component';
import { PanelComponent } from './panel/panel.component';
import { ClockService } from './clock.service';
import { TimerComponent } from './timer/timer.component';

@NgModule({
  declarations: [
    AppComponent,
    WatchComponent,
    PanelComponent,
    TimerComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [ClockService],
  bootstrap: [AppComponent]
})
export class AppModule {}
