  import { Component, ViewEncapsulation, ViewChild, ElementRef } from '@angular/core';
  import { FormControl, FormGroup, Validators } from '@angular/forms';
  import { EventSettingsModel, ResizeEventArgs, EventRenderedArgs, ScheduleComponent, PopupOpenEventArgs, CellClickEventArgs, EventClickArgs, EJ2Instance, ResizeService} from '@syncfusion/ej2-angular-schedule';
  import { Event } from '../shared/models/events';
  import { EventsService } from '../shared/services/events.service';
  import { DropDownList } from "@syncfusion/ej2-dropdowns";
  import { Router } from '@angular/router';
  import { eventData } from '../datasource';


  @Component({
    selector: 'app-scheduler',
    templateUrl: './scheduler.component.html',
    styleUrls: ['./scheduler.component.scss']
  })
  export class SchedulerComponent {
    @ViewChild('subjectInput') subjectInput: ElementRef | undefined;
    @ViewChild("scheduleObj") scheduleObj: ScheduleComponent | undefined;
    patientName: string = '';
    selectedPatient: string = '';
    ngOnInit() {
      this.selectedPatient = this.patients[0];
    }
  public selectedDate: Date = new Date(2018, 1, 15);
  public views: Array<string> = ['Day', 'Week', 'WorkWeek', 'Month'];
  public showQuickInfo: Boolean = false;
  public startDate!: Date;
  public endDate!: Date;
  public eventSettings: EventSettingsModel = {
    dataSource: eventData,
    fields: {
      subject: { name: "Subject", validation: { required: true } },
      description: {
        name: "Description",
        validation: { required: true }
      }
    }
  };

    public editingEvent?:Event;
    showAddForm: boolean = false;
    events: Event[] = [];
    patients: string[] = ['Patient 1', 'Patient 2'];
    public saveButton: object = { content: 'Ok', cssClass: 'e-outline'};
    public cancelButton: object = { content: 'Cancel', cssClass: 'e-outline'};
    constructor(private eventService: EventsService, private router: Router) { }

    onResizeStart(args: ResizeEventArgs): void {
      args.scroll!.enable = false;
    }

    onEventRendered(args: EventRenderedArgs): void {
      // Customize the appearance of events if needed
    }
    newForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      age: new FormControl<number | null>(null, [Validators.required, Validators.min(0)]), 
      job: new FormControl('', [Validators.required])
    });
    editForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      age: new FormControl<number | null>(null, [Validators.required, Validators.min(0)]), 
      job: new FormControl('', [Validators.required])
    });
    
    editEvents(event:Event){
      this.editingEvent = event;

      this.newForm.setValue({
        name:this.editingEvent.name,
        lastName:this.editingEvent.lastName,
        age:this.editingEvent.age,
        job:this.editingEvent.job
      });
    }

    updateEvent(){
      if(this.editingEvent){
        const updatedEvent: Event = {
          id: this.editingEvent.id,
          name: this.newForm.value.name || '',
          lastName: this.newForm.value.lastName || '',
          age: this.newForm.value.age || 0,
          job: this.newForm.value.job || ''
        };
        this.eventService.updateEvent(updatedEvent).subscribe(()=>{
          this.editingEvent=undefined;
          this.loadEvent();
        });
      }
    }

    addEvent(): void {
      if (this.newForm.valid) {
          const newEvent: Event = {
            id: '',
            name: this.newForm.value.name || '',
            lastName: this.newForm.value.lastName || '',
            age: this.newForm.value.age || 0,
            job: this.newForm.value.job || '',
          };

          this.eventService.addEvent(newEvent).subscribe(() => {
              this.loadEvent();

              this.newForm.reset();
          });
      } else {
          console.error('Form is invalid');
      }
  }
    loadEvent() {
      this.eventService.getEvent().subscribe(e => {
        this.events = e;
      });
    }

    editEvent(event: Event){
      this.editingEvent = event;

      this.editForm.setValue({
        name:this.editingEvent.name,
        lastName:this.editingEvent.lastName,
        age:this.editingEvent.age,
        job:this.editingEvent.job
      });
    }

    cancelEditEvent(){
      this.editingEvent = undefined;
    }

    deleteEvent(id: string){
      this.eventService.deleteEvent(id).subscribe(()=>{
        this.loadEvent();
      })
    }
    onCellClick(args: CellClickEventArgs): void {
        this.scheduleObj?.openEditor(args, 'Add');
    }
    onEventClick(args: EventClickArgs): void {
        if (!(args.event as any).RecurrenceRule) {
        this.scheduleObj?.openEditor(args.event, 'Save');
        }
        else {
        this.scheduleObj?.quickPopup.openRecurrenceAlert();
        }
    }
    
    // onPopupOpen(args: PopupOpenEventArgs): void {
    //   // args.cancel = true;

    //   // this.router.navigate(['/add-form'], {
    //   //   queryParams: {
    //   //     // startTime: args.data.startTime.toISOString(),
    //   //     // endTime: args.data.endTime.toISOString(),
    //   //     // Add other parameters if necessary
    //   //   }
    //   // });
    // }
    // editorTemplate(): string {
    //   return `
    //     <div class="custom-editor">
    //       <h3>ვიზიტის დანიშვნა</h3>
    //       <div class="form-group">
    //         <label for="name">Name:</label>
    //         <input type="text" class="form-control" id="name" [(ngModel)]="newForm.value.name" placeholder="Name">
    //       </div>
    //       <div class="form-group">
    //         <label for="lastName">Last Name:</label>
    //         <input type="text" class="form-control" id="lastName" [(ngModel)]="newForm.value.lastName" placeholder="Last Name">
    //       </div>
    //       <div class="form-group">
    //         <label for="age">Age:</label>
    //         <input type="number" class="form-control" id="age" [(ngModel)]="newForm.value.age" placeholder="Age">
    //       </div>
    //       <div class="form-group">
    //         <label for="purpose">Purpose of Visit:</label>
    //         <input type="text" class="form-control" id="purpose" [(ngModel)]="newForm.value.purpose" placeholder="Purpose of Visit">
    //       </div>
    //       <div class="form-group">
    //         <label for="comments">Comments:</label>
    //         <textarea class="form-control" id="comments" [(ngModel)]="newForm.value.comments" placeholder="Comments"></textarea>
    //       </div>
    //       <div class="form-group">
    //         <label for="doctorName">Doctor's Name:</label>
    //         <input type="text" class="form-control" id="doctorName" [(ngModel)]="newForm.value.doctorName" placeholder="Doctor's Name">
    //       </div>
    //       <div class="form-group">
    //         <button type="button" class="btn btn-primary" (click)="saveForm()">Save</button>
    //         <button type="button" class="btn btn-secondary" (click)="cancelForm()">Cancel</button>
    //       </div>
    //     </div>
    //   `;
    // }






    public onPopupOpen(args: PopupOpenEventArgs): void {
      if (args.type === "Editor") {
        const formElement: HTMLElement = args.element.querySelector(".e-schedule-form") as HTMLElement;
        if (args.target!.classList.contains("e-work-cells")) {
          args.element.querySelector(".e-event-save")!.classList.add("e-custom-disable");
        }
      }
    }



    onChange(args: any) {
      // ...
      let form = (document.querySelector(".e-schedule-form") as any).ej2_instances[0];
      if (args.element && !args.e) {
        return;
      }
      console.log('form:', form);
      if (args.element && !args.e) {
        return;
      }
      let names = ["Subject", "Description", "EventType"];
      names.forEach(e => {
        form.validateRules(e);
      });
      let isValidated = false;
      let errorElements = document.querySelector(".e-dlg-content")!.querySelectorAll(".e-schedule-error");
      for (let i = 0; i < errorElements.length; i++) {
        isValidated = (errorElements[i] as any).style.display === "none" ? true : false;
        if (isValidated === false) {
          break;
        }
      }
      let saveBtn = document.querySelector(".e-custom-disable");
      if (isValidated && saveBtn) {
        saveBtn.classList.remove("e-custom-disable");
      } else if (!isValidated && !saveBtn) {
        document.querySelector(".e-event-save")!.classList.add("e-custom-disable");
      }
    }
  
    onClick(): void {
      this.showAddForm = true;
    }

    onClose(newPatientName?: string) {
      this.showAddForm = false;
      
      if (newPatientName) {
        this.patients.push(newPatientName);
        this.patientName = newPatientName; // Update the patientName
    }
    
    }
    onPatientChange(event: Event & { target: HTMLSelectElement }): void {
      // Typecast the event.target to HTMLSelectElement
      const target = event.target as HTMLSelectElement;

      // Check if the target is valid and update patientName with the selected value from the dropdown
      if (target && target.value !== undefined) {
          this.patientName = target.value;
      } else {
          console.error('The event target is not a valid HTMLSelectElement or the value is not defined.');
      }
  }



  // Implement the save event function
  // saveEvent(data: any): void {
  //   // Perform validation and other logic as necessary
  //   // Data object contains the event information
  //   // e.g., data.Subject, data.StartTime, data.EndTime, etc.

  //   // If you want to update the event on the calendar
  //   this.scheduleObj.saveEvent(data);

  //   // After saving the event, you might want to close the editor
  //   this.scheduleObj.closeEditor();
  // }
//   onSave(data: any): void {
//     // Update the data object with the values from the form fields
//     if (data) {
//         // Modify the event data as needed
//         // Then, save the event using the Scheduler's `saveEvent` method
//         this.scheduleObj.saveEvent(data);

//         // Refresh the scheduler to reflect the changes
//         this.scheduleObj.refresh();

//         // Close the editor
//         this.scheduleObj.closeEditor();
//     } else {
//         console.error('Data is undefined or null');
//     }
// }
  
  }