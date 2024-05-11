import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Patient } from '../models/users';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private url='';

  constructor(private http:HttpClient){ }

  public getPatient(): Observable<Patient[]>{
    return this.http.get<Patient[]>(this.url);
  }

  public addPatient(patient: Patient){
    return this.http.post<Patient>(this.url, patient);
}   

  public updatePatient(patient: Patient){
      return this.http.put<Patient>(`${this.url}/${patient.id}`, patient);
  }

  public deletePatient(id:string){
      return this.http.delete(`${this.url}/${id}`);
  }
}
