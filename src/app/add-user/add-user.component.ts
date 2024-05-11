import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Patient } from '../shared/models/users';
import { UsersService } from '../shared/services/users.service';
import { PopupOpenEventArgs, ScheduleComponent } from '@syncfusion/ej2-angular-schedule';

@Component({
  selector: 'app-add-User',
  templateUrl: './add-User.component.html',
  styleUrls: ['./add-User.component.scss']
})
export class AddUserComponent {
  @ViewChild('scheduleObj') public scheduleObj!: ScheduleComponent;
  public editingPatient?: Patient;
  @Output() close = new EventEmitter<string>();
  Patients: Patient[] = [];
  patientName: string = '';
  
  constructor(private usersService: UsersService, private router: Router) { }

  onSaveChanges() {
    this.close.emit(this.patientName);
  }
  onCancel() {
    this.close.emit(undefined);
  }

  newForm = new FormGroup({
    citizenship: new FormControl('', [Validators.required]),
    name: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    gender: new FormControl('', [Validators.required]),
    birthDate: new FormControl('', [Validators.required]),
    PID: new FormControl('', [Validators.required]),
    mobileNumberPrimary: new FormControl('', [Validators.required]),
    mobileNumberSecondary: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required]),
    jobPlace: new FormControl('', [Validators.required]),
    insurance: new FormControl('', [Validators.required]),
    insuranceNumber: new FormControl('', [Validators.required]),
  });

  editForm = new FormGroup({
    citizenship: new FormControl('', [Validators.required]),
    name: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    gender: new FormControl('', [Validators.required]),
    birthDate: new FormControl('', [Validators.required]),
    PID: new FormControl('', [Validators.required]),
    mobileNumberPrimary: new FormControl('', [Validators.required]),
    mobileNumberSecondary: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required]),
    jobPlace: new FormControl('', [Validators.required]),
    insurance: new FormControl('', [Validators.required]),
    insuranceNumber: new FormControl('', [Validators.required]),
  });
  
  editPatient(Patient: Patient){
    this.editingPatient = Patient;

    this.newForm.setValue({
      citizenship:this.editingPatient.citizenship,
      name:this.editingPatient.name,
      lastName:this.editingPatient.lastName,
      gender:this.editingPatient.gender,
      birthDate:this.editingPatient.birthDate,
      PID: this.editingPatient.PID,
      mobileNumberPrimary:this.editingPatient.mobileNumberPrimary,
      mobileNumberSecondary:this.editingPatient.mobileNumberSecondary,
      email:this.editingPatient.email,
      jobPlace:this.editingPatient.jobPlace,
      insurance :this.editingPatient.insurance,
      insuranceNumber:this.editingPatient.insuranceNumber
    });
  }

  updatePatient(){
    if(this.editingPatient){
      const updatedPatient: Patient = {
        id: this.editingPatient.id,
        citizenship: this.newForm.value.citizenship || '',
        name: this.newForm.value.name || '',
        lastName: this.newForm.value.lastName || '',
        gender: this.newForm.value.gender || '',
        birthDate: this.newForm.value.birthDate || '',
        PID: this.newForm.value.PID || '',
        mobileNumberPrimary: this.newForm.value.mobileNumberPrimary || '',
        mobileNumberSecondary: this.newForm.value.mobileNumberSecondary || '',
        email: this.newForm.value.email || '',
        jobPlace: this.newForm.value.jobPlace || '',
        insurance: this.newForm.value.insurance || '',
        insuranceNumber: this.newForm.value.insuranceNumber || '',
      };
    
      this.usersService.updatePatient(updatedPatient).subscribe(()=>{
        this.editingPatient=undefined;
        this.loadPatient();
      });
    }
    };


  addPatient(): void {
    if (this.newForm.valid) {
        const newPatient: Patient = {
          id: '',
          citizenship: this.newForm.value.citizenship || '',
          name: this.newForm.value.name || '',
          lastName: this.newForm.value.lastName || '',
          gender: this.newForm.value.gender || '',
          birthDate: this.newForm.value.birthDate || '',
          PID: this.newForm.value.PID || '',
          mobileNumberPrimary: this.newForm.value.mobileNumberPrimary || '',
          mobileNumberSecondary: this.newForm.value.mobileNumberSecondary || '',
          email: this.newForm.value.email || '',
          jobPlace: this.newForm.value.jobPlace || '',
          insurance: this.newForm.value.insurance || '',
          insuranceNumber: this.newForm.value.insuranceNumber || '',
        };

        this.usersService.addPatient(newPatient).subscribe(() => {
            this.loadPatient();

            this.newForm.reset();
        });
    } else {
        console.error('Form is invalid');
    }
  }


  loadPatient() {
    this.usersService.getPatient().subscribe(p => {
      this.Patients = p;
    });
  }

  cancelEditPatient(){
    this.editingPatient = undefined;
  }

  deletePatient(id: string){
    this.usersService.deletePatient(id).subscribe(()=>{
      this.loadPatient();
    })
  }
}