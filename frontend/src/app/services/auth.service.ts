import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http"
import { Router } from '@angular/router';

import { User } from "../models/User";
import { Meeting } from "../models/Meeting";

import { BehaviorSubject, Observable } from 'rxjs';
import { first, catchError, tap } from 'rxjs/operators';
import { ErrorHandlerService } from './error-handler.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private url = "http://localhost:3000/";

  isUserLoggedIn$ = new BehaviorSubject<boolean>(false);
  userId: Pick<User, "id">
  userName: Pick<User, "firstName">
  httpOptions: { headers: HttpHeaders } = {
    headers: new HttpHeaders({"Content-Type": "application/json"})
  }
  constructor(
    private http: HttpClient,
    private errorHandlerService: ErrorHandlerService,
    private router: Router
  ) { }

  signup(user: Omit<User,"id">): Observable<User>{
    return this.http.post<User>(`${this.url}users/signup`,user,this.httpOptions).pipe(
      first(),
      catchError(this.errorHandlerService.handleError<User>("signup"))
    );
  }

  getName(userId: number): Observable<Pick<User,"firstName">>{

    return this.http
      .get<User>(`${this.url}users/getName/${userId}`, { responseType: "json" })
      .pipe(
        catchError(this.errorHandlerService.handleError<User>("getName"))
      );
  }
  login(email: Pick<User,"email">, password: Pick<User,"password">): Observable<{
    token: string; id: Pick<User,"id">
  }>{
    return this.http
    .post(`${this.url}users/login`,{email,password},this.httpOptions)
    .pipe(
      first(),
      tap((tokenObject: { token: string; id: Pick<User,"id">; name: Pick<User,"firstName"> }) => {
        this.userId = tokenObject.id;
        this.userName = tokenObject.name;
        localStorage.setItem("token",tokenObject.token);
        this.isUserLoggedIn$.next(true);
        this.router.navigate(["/dashboard"]);
      }),
      catchError(this.errorHandlerService.handleLoginError<{
        token: string; id: Pick<User,"id">; name: Pick<User,"firstName">
      }>("login"))
    );
  }

}


