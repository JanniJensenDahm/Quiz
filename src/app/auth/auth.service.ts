import { Injectable } from '@angular/core';
import {Observable, of} from "rxjs";
import {delay, tap} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoggedIn = false;
  isAdmin = false;
  redirectUrl: string;

  login(isAdmin): Observable<boolean>{
    this.isAdmin = isAdmin;

    return of(true).pipe(
      delay(1000),
      tap(val => {
        this.isLoggedIn = true
      })
    );
  }

  logout(): void{
    this.isLoggedIn = false;
  }
}
