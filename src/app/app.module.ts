import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';  

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SchedulerComponent } from './scheduler/scheduler.component';
import { ScheduleModule, RecurrenceEditorModule, DayService, WorkWeekService, MonthService, AgendaService, DragAndDropService, ResizeService, WeekService, TimelineViewsService, TimelineMonthService, TimelineMonth} from '@syncfusion/ej2-angular-schedule';
import { FormsModule } from '@angular/forms';
import { AddUserComponent } from './add-user/add-user.component';

@NgModule({
  declarations: [
    AppComponent,
    SchedulerComponent,
    AddUserComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ScheduleModule, RecurrenceEditorModule,
    FormsModule
  ],
  providers: [ DayService, WeekService, WorkWeekService, MonthService, AgendaService, ResizeService, DragAndDropService, TimelineViewsService, TimelineMonthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
