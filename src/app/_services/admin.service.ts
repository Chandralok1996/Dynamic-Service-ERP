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
        'auth-token': JSON.parse(localStorage.getItem('user') || '').token,
      }),
    };
    return this._http.post<any[]>(
      `${environment._url}/user/createUser`,
      data,
      httpOptions
    );
  }
  updateuser(data:any): Observable<any[]> {
    const httpOptions = {
      headers: new HttpHeaders({
        'auth-token': JSON.parse(localStorage.getItem('user') || '').token,
      }),
    };
    return this._http.put<any[]>(
      `${environment._url}/user/updateUser`,
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

  //Asset - Module
  itemCreate(data: any): Observable<any[]> {
    const httpOptions = {
      headers: new HttpHeaders({
        'auth-token': JSON.parse(localStorage.getItem('user') || '').token,
      }),
    };
    return this._http.post<any[]>(
      `${environment._url}/assets/createAsset`,
      data,
      httpOptions
    );
  }

  itemList():Observable<any>
  {
    const httpOptions = {
      headers: new HttpHeaders({
        'auth-token': JSON.parse(localStorage.getItem('user') || '').token,
      }),
    };
    return this._http.get<any>( `${environment._url}/assets/getAssetList`,
    httpOptions
     );
  }

  getItemdetails(astd_id: number): Observable<any> {
    return this._http.get<any>( `${environment._url}/assets/getAssetDetails/${astd_id}`);
  }

  updateItem(astd_id:any): Observable<any[]> {
    const httpOptions = {
      headers: new HttpHeaders({
        'auth-token': JSON.parse(localStorage.getItem('user') || '').token,
      }),
    };
    return this._http.put<any[]>(
      `${environment._url}/assets/updateAsset`,
      astd_id,
      httpOptions
    );
  }

  //role-create
  createRole(data: any): Observable<any[]> {
    const httpOptions = {
      headers: new HttpHeaders({
        'auth-token': JSON.parse(localStorage.getItem('user') || '').token,
      }),
    };
    return this._http.post<any[]>(
      `${environment._url}/user/createUser`,
      data,
      httpOptions
    );
  }
  applyprevilenge(data: any): Observable<any> {
    return this._http.post<any>( `${environment._url}/formTemplate/createFormFieldAccess`, data );
  }

}