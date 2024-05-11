import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Event } from '../models/events';

@Injectable({
  providedIn: 'root'
})
export class EventsService {

  private url='';

  constructor(private http:HttpClient){ }

  public getEvent(): Observable<Event[]>{
    return this.http.get<Event[]>(this.url);
  }

  public addEvent(event: Event){
    return this.http.post<Event>(this.url, event);
}   

  public updateEvent(event:Event){
      return this.http.put<Event>(`${this.url}/${event.id}`, event);
  }

  public deleteEvent(id:string){
      return this.http.delete(`${this.url}/${id}`);
  }
}