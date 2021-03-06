import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { ServerResponse } from '../../common/server/response.interface';
import { environment } from 'src/environments/environment';

const httpOptions = {
  withCredentials: true,
  headers: new HttpHeaders({
  'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class BalanceService {
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
        //console.error(`Backend error code: ${error.status}, backend message: ${error.error}`);
        return throwError(error);
    }
    // Return an observable with user-facing error msg
    // return throwError(`Something went wrong, please try again.`)
  }

  // Client deposit balance
  getAccountBalance(userId: string): Observable<ServerResponse>{
    return this.http.get<ServerResponse>(`${this.API_DOMAIN}/api/deposit/balance/${userId}`, httpOptions)
    .pipe(
      retry(2),
      catchError(this.handleError)            
    );
  }

  // Calculate and return client withdrawable balance
  /* getClientWithdrawableAccountBalance(clientId: string): Observable<ServerResponse>{
    return this.http.get<ServerResponse>(`${this.API_DOMAIN}/api/Clients/balance/withdrawable/${clientId}`, httpOptions)
    .pipe(
        retry(2),
        catchError(this.handleError)            
    );
  } */

}
