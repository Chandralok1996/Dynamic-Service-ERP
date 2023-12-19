import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { ToasterService } from './toaster.service';
import { CookieService } from 'ngx-cookie-service';

export interface Users {
  name: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class AppService {
  private userSubject: BehaviorSubject<any>;
  public user: Observable<any>;
  userData: any;
  public pagination: any = [10, 25, 50, 100];

  constructor( private _http: HttpClient, private router: Router, private _cookie: CookieService, private toaster: ToasterService ) {
    this.userSubject = new BehaviorSubject<any>(localStorage.getItem('user'));
    this.user = this.userSubject.asObservable();
  }

  userLogIn(data: Users): Observable<any[]> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this._http.post<any[]>( `${environment._url}/user/userLogin`, data, httpOptions ).pipe(map((userData: any) => {
      if (userData.status) {
        localStorage.setItem('user', JSON.stringify(userData.response));
        this._cookie.set("token", userData.response.token)
        this.userSubject = userData.response;
        return userData;
      } else {
        return '';
      }
    }));
  }


  gettoken() {
    return !!(localStorage.getItem('user') && this._cookie.get('token'));
  }

  public get userValue(): any {
    return this.userSubject.value;
  }

  logout(): void {
    this._cookie.delete('token');
    this._cookie.deleteAll();
    localStorage.removeItem('user');
    localStorage.clear();
    this.userSubject.next(null);
    this.router.navigate(['/sign-in']);
    this.toaster.success('Log out successfully.');
  }

}
