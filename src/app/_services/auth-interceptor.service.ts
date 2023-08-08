import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {
  private tokenData: string | null = null;

  constructor(private _cookie: CookieService) { 
    this.tokenData = this._cookie.get('token');
   }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let tokenizedRequest = req.clone();
    if(this.tokenData) {
      tokenizedRequest = tokenizedRequest.clone({ headers: req.headers.set('Authorization', `Bearer ${this.tokenData}`) });
    }
    return next.handle(tokenizedRequest);
  }
}