import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from './types';
import { GenericAPIService } from './generic-api.service';
import { catchError } from 'rxjs/operators';
import { HttpResponse, HttpHeaders } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class UserService extends GenericAPIService {
    public path = '/user';

    public registerNewUser(user: User): Observable<HttpResponse<User>> {
        const headers = new HttpHeaders().append('Content-Type' , 'application/json');
        return this.httpService
            .post<User>(this.endpoint + '/register', user, { headers, observe: 'response' })
            .pipe(catchError(this.handleError));
      }

      public getUserDetails(userName: string): Observable<User> {
        return this.httpService
            .get<User>(this.endpoint + '/detail', { params: { userName } })
            .pipe(catchError(this.handleError));
      }

      public updateUser(user: User): Observable<User> {
        const headers = new HttpHeaders().append('Content-Type' , 'application/json');
        return this.httpService
            .put<User>(this.endpoint + '/update', user, { headers })
            .pipe(catchError(this.handleError));
      }
}
