import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';


@Injectable({
  providedIn: 'root'

})

export class AdminService {

  constructor( private _http: HttpClient, private _cookie: CookieService ) {}

  getFormList(): Observable<any> {
    return this._http.get<any>( `${environment._url}/formTemplate/getFormList` );
  }

  getFormByID(fmls_id: number): Observable<any> {
    return this._http.get<any>( `${environment._url}/formTemplate/getFormDetails/${fmls_id}` );
  }

  addColumnInForm(data: any): Observable<any> {
    return this._http.post<any>( `${environment._url}/formTemplate/addColumn`, data );
  }

  updateColumnInForm(data: any): Observable<any> {
    return this._http.put<any>( `${environment._url}/formTemplate/updateColumn`, data );
  }

  installationcreate(data: any): Observable<any[]> {
    const httpOptions = {
      headers: new HttpHeaders({
        // 'Content-Type': 'application/json',
        'auth-token': JSON.parse(localStorage.getItem('user') || '').token,
      }),

    };

    return this._http.post<any[]>(
      `${environment._url}/user/createUser`,
      data,
      httpOptions
    );

  }
  userlist():Observable<any>
  {
    const httpOptions = {
      headers: new HttpHeaders({
        // 'Content-Type': 'application/json',
        'auth-token': JSON.parse(localStorage.getItem('user') || '').token,
      }),

    };
    return this._http.get<any>( `${environment._url}/user/getUserList`,
    httpOptions
     );

  }
  getuserdetails(userid: number): Observable<any> {
    return this._http.get<any>( `${environment._url}/user/getUserDetails/${userid}` );
  }
}