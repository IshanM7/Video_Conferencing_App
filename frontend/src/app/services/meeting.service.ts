import { Injectable } from '@angular/core';

import { HttpClient, HttpClientModule, HttpHeaders } from "@angular/common/http"
import { Router } from '@angular/router';

import { User } from "../models/User";
import { Meeting } from "../models/Meeting";

import { BehaviorSubject, Observable } from 'rxjs';
import { first, catchError, tap } from 'rxjs/operators';
import { ErrorHandlerService } from './error-handler.service';



@Injectable({
  providedIn: 'root'
})
export class MeetingService {
  private url = "http://localhost:3000/meeting";
  private conference = "http://localhost:5000/meeting/chat";

  httpOptions: { headers: HttpHeaders } = {
    headers: new HttpHeaders({"Content-Type": "application/json"})
  };

  constructor(private http: HttpClient, private errorHandlerService: ErrorHandlerService, private router: Router) { }

  getMeetings(): Observable<Meeting[]> {
    return this.http
      .get<Meeting[]>(this.url, { responseType: "json" })
      .pipe(
        catchError(this.errorHandlerService.handleError<Meeting[]>("getMeetings", []))
      );
  }
  getSingleMeeting(meetingID: number): Observable<Meeting>{
    return this.http
      .get<Meeting>(`${this.url}/${meetingID}`, { responseType: "json" })
      .pipe(
        catchError(this.errorHandlerService.handleError<Meeting>("getSingleMeetings"))
      );
  }
  getMeetingFromUUID(meetingLink: string): Observable<Meeting>{

    return this.http
      .get<Meeting>(`${this.url}/chat/${meetingLink}`, { responseType: "json" })
      .pipe(
        catchError(this.errorHandlerService.handleError<Meeting>("getMeetingFromUUID"))
      );
  }
  getParticipants(meetingID: number): Observable<Meeting>{

    return this.http
      .get<Meeting>(`${this.url}/currParticipants/${meetingID}`, { responseType: "json" })
      .pipe(
        catchError(this.errorHandlerService.handleError<Meeting>("getMeetingFromUUID"))
      );
  }

  scheduleMeeting(formData: Partial<Meeting>, id: Pick<User,"id">): Observable<Meeting>{


    console.log(formData.time);
    let date = formData.time.replace('T', ' ');
    console.log(date);

    return this.http
      .post<Meeting>(`${this.url}/schedule`,
        { meetingName: formData.meetingName, meetingDescription: formData.meetingDescription, time: date, meetingHost: id, numParticipants: formData.numParticipants},
        this.httpOptions)
      .pipe(
        tap( () => {
          alert('Meeting scheduled successfully');
          this.router.navigate(["/dashboard"]);
        }),
        catchError(this.errorHandlerService.handleError<Meeting>("scheduleMeeting"))
      );

  }
  startMeeting(id: Pick<Meeting,"meetingID">, uuid: Pick<Meeting,"meetingLink">, firstName: string): Observable<Meeting>{
    return this.http
      .post<Meeting>(`${this.url}/startMeeting`,
        { meetingID: id},
        this.httpOptions)
      .pipe(
        tap( () => {
          alert('Meeting started successfully');
          window.open("http://localhost:5000/meeting/chat/"+uuid+"?host=true","_blank");
        }),
        catchError(this.errorHandlerService.handleError<Meeting>("startMeeting"))
      );

  }
  joinMeeting(id: Pick<Meeting,"meetingID">, uuid: Pick<Meeting,"meetingLink">): Observable<Meeting>{
    console.log(id);
    console.log(uuid);
    return this.http
    .post<Meeting>(`${this.url}/joinMeeting`,
      { meetingID: id},
      this.httpOptions)
    .pipe(
      tap( () => {
        alert('Meeting joined successfully');
        window.open("http://localhost:5000/meeting/chat/"+uuid+"?host=false","_blank");
      }),
      catchError(this.errorHandlerService.handleError<Meeting>("joinMeeting"))
    );
  }
  deleteMeeting(meetingID: Pick<Meeting, "meetingID">): Observable<{}>{
    return this.http.delete<Meeting>(`${this.url}/${meetingID}`,this.httpOptions).pipe(
      first(),
      catchError(this.errorHandlerService.handleError<Meeting>("deleteMeeting"))
    );
  }
  changeMeetingName(formData: Partial<Meeting>, id: Pick<Meeting,"meetingID">): Observable<Meeting>{
    return this.http
      .post<Meeting>(`${this.url}/changeName`,
        { meetingName: formData.meetingName, meetingID: id},
        this.httpOptions)
      .pipe(
        tap( () => {
          alert('Meeting name updated');
        }),
        catchError(this.errorHandlerService.handleError<Meeting>("changeName"))
      );
  }
  changeMeetingDescription(formData: Partial<Meeting>, id: Pick<Meeting,"meetingID">): Observable<Meeting>{
    return this.http
      .post<Meeting>(`${this.url}/changeDescription`,
        { meetingDescription: formData.meetingDescription, meetingID: id},
        this.httpOptions)
      .pipe(
        tap( () => {
          alert('Meeting description updated');
        }),
        catchError(this.errorHandlerService.handleError<Meeting>("changeDescription"))
      );
  }
  changeMeetingParticipation(formData: Partial<Meeting>, id: Pick<Meeting,"meetingID">): Observable<Meeting>{
    console.log(formData.numParticipants);
    return this.http
      .post<Meeting>(`${this.url}/changeParticipation`,
        { numParticipants: formData.numParticipants, meetingID: id},
        this.httpOptions)
      .pipe(
        tap( () => {
          alert('Number of participations updated');
        }),
        catchError(this.errorHandlerService.handleError<Meeting>("changeParticipation"))
      );
  }
  changeMeetingTime(formData: Partial<Meeting>, id: Pick<Meeting,"meetingID">): Observable<Meeting>{

    let date = formData.time.replace('T', ' ');
    return this.http
      .post<Meeting>(`${this.url}/changeTime`,
        { time: date, meetingID: id},
        this.httpOptions)
      .pipe(
        tap( () => {
          alert('Meeting time updated');
        }),
        catchError(this.errorHandlerService.handleError<Meeting>("changeTime"))
      );
  }



}
