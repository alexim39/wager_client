import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { tap, catchError, retry } from 'rxjs/operators';
import { ServerResponse } from './../../common/server/response.interface';
import { environment } from 'src/environments/environment';

export interface TransactionsInterface {
    userId: string;
    amount: number;
    investedFrom: string;
    period: number;
    plan: string;
    transactionId: number;
    start: Date;
    transactionStatus: string;
}

export interface WithdrawalInterface {
  userId: string;
  amount: number;
  bankName: string;
  accountNo: string;
  withdrawDate: Date;
  status: string;
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
export class TransactionsService {
  showSpinner: BehaviorSubject<boolean> = new BehaviorSubject(undefined);
  private readonly API_DOMAIN: string = environment.API_DOMAIN;

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


  // Get user Investment Details
  getHistory(userId: string): Observable<ServerResponse> {
    this.showSpinner.next(true);
    return this.http.get<ServerResponse>(`${this.API_DOMAIN}/api/lay/transactions/lay/${userId}`, httpOptions)
    .pipe(
      retry(2),
      tap(response => this.showSpinner.next(false), error => this.showSpinner.next(false)),
      catchError(this.handleError)
    );
  }


  // get all client withdraw request
  getWithdrawRequest(userId: string): Observable<ServerResponse> {
    return this.http.get<ServerResponse>(`${this.API_DOMAIN}/api/withdraw/request/${userId}`, httpOptions)
    .pipe(
      retry(2), 
      catchError(this.handleError)
    );
  }

  // cancel client withdraw request
  cancelWithdrawRequest(withdrawId: string): Observable<ServerResponse> {
    return this.http.get<ServerResponse>(`${this.API_DOMAIN}/api/withdraw/cancel/${withdrawId}`, httpOptions)
    .pipe(
      retry(2), 
      catchError(this.handleError)
    );
  }

  public getDeposits(userId: string): Observable<ServerResponse>{
    return this.http.get<ServerResponse>(`${this.API_DOMAIN}/api/deposit/${userId}`, httpOptions)
    .pipe(
        retry(2),
        catchError(this.handleError)            
    );
  }

  
}