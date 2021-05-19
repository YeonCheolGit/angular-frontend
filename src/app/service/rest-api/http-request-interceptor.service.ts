import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpInterceptor, HttpEvent, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpRequestInterceptorService  implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('x-auth-token');
    let requestHeader: HttpHeaders = req.headers;
    if (token) {
      requestHeader = requestHeader.set('x-auth-token', token);
    }
    const newRequest = req.clone({headers: requestHeader});
    return next.handle(newRequest);
  }
}
