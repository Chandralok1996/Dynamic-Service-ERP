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
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' })};
    return this._http.get<any>( `${environment._url}/formTemplate/getFormList`, httpOptions );
  }

  getFormByID(fmls_id: number): Observable<any> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' })};
    return this._http.get<any>( `${environment._url}/formTemplate/getFormDetails/${fmls_id}`, httpOptions );
  }

  addColumnInForm(data: any): Observable<any> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' })};
    return this._http.post<any>( `${environment._url}/formTemplate/addColumn`, data, httpOptions );
  }

}
