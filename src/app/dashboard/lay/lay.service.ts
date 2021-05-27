import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { ServerResponse } from '../../common/server/response.interface';
import { environment } from 'src/environments/environment';

export interface LayInterface {
    userId: string;
    amount: number;
    layedFrom: string;
    period: number;
    plan: string;
    transactionId: number;
    transactionStatus: string;
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
  export class LayService {
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

    // Submit Cashout Investment from deposit
  coinoutFromDeposit(coinoutObj: LayInterface): Observable<ServerResponse> {
    return this.http.post<ServerResponse>(`${this.API_DOMAIN}/api/lay/coinout/deposit`, coinoutObj, httpOptions)
    .pipe(
      retry(2), 
      catchError(this.handleError)
    );
  }

  // Submit Cashout Investment from withdrawable
  coinoutFromWithdrawable(coinoutObj: LayInterface): Observable<ServerResponse> {
    return this.http.post<ServerResponse>(`${this.API_DOMAIN}/api/lay/coinout/withdrawable`, coinoutObj, httpOptions)
    .pipe(
      retry(2), 
      catchError(this.handleError)
    );
  }

  // Submit Cashout Investment from deposit balance
  coinupFromDeposit(coinuptObj: LayInterface): Observable<ServerResponse> {
    return this.http.post<ServerResponse>(`${this.API_DOMAIN}/api/lay/coinup/deposit`, coinuptObj, httpOptions)
    .pipe(
      retry(2), 
      catchError(this.handleError)
    );
  }

  // Submit Cashout Investment from withdrawable balance
  coinupFromWithdrawable(coinuptObj: LayInterface): Observable<ServerResponse> {
    return this.http.post<ServerResponse>(`${this.API_DOMAIN}/api/lay/coinup/withdrawable`, coinuptObj, httpOptions)
    .pipe(
      retry(2), 
      catchError(this.handleError)
    );
  }

}