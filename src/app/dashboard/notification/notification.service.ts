import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError, retry } from 'rxjs/operators';
import { ServerResponse } from './../../common/server/response.interface';
import { environment } from 'src/environments/environment';


export interface NotificationInterface {
  _id: string;
  userId: string;
  title: string;
  body: string;
  source: string;
  status: string;
  createDate: Date;
}


const httpOptions = {
  withCredentials: true,
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  private API_DOMAIN: string = environment.API_DOMAIN;

  constructor(private http: HttpClient) { }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occured. Handle accordingly
      // console.error('An error occured:', error.error.message);
      return throwError(`Request failed due to network error, please try again`);
    } else {
      // Backend returned an unsuccessful response code.
      // The repsonse body contains clues as to what went wrong
      // console.error(`Backend error code: ${error.status}, backend message: ${error.error}`);
      return throwError(error);
    }
    // Return an observable with user-facing error msg
    // return throwError(`Something went wrong, please try again.`)
  }

  // Get user notifications
  getNotifications(userId: string): Observable<ServerResponse> {
    return this.http.get<ServerResponse>(`${this.API_DOMAIN}/api/notification/${userId}`, httpOptions)
    .pipe(
      retry(2), 
      catchError(this.handleError)
    );
  }

  // mark as read
  markAsRead(id: string): Observable<ServerResponse> {
    return this.http.get<ServerResponse>(`${this.API_DOMAIN}/api/notification/mark-as-read/${id}`, httpOptions)
    .pipe(
      retry(2), 
      catchError(this.handleError)
    );
  }

  // delete notification
  deleteNotification(id: string): Observable<ServerResponse> {
    return this.http.delete<ServerResponse>(`${this.API_DOMAIN}/api/notification/${id}`, httpOptions)
    .pipe(
      retry(2), 
      catchError(this.handleError)
    );
  }
}
