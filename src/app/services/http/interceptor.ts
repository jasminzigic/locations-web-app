import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root'
})
export class HttpInterceptBasicAuthService implements HttpInterceptor {

  constructor(private basicAuthService: AuthService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const basicAuthenticationHeaderString = this.basicAuthService.getAuthenticatedToken();
    const username = this.basicAuthService.getAuthenticatedUser();
    if (basicAuthenticationHeaderString && username && req.url.indexOf('maps.googleapis.com') === -1) {
      req = req.clone({
        setHeaders: {
          Authorization: basicAuthenticationHeaderString
        }
      });
    }
    return next.handle(req);
  }
}
