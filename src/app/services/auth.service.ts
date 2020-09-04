import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { User } from '../api/types';
import { BehaviorSubject } from 'rxjs';
import { UserService } from '../api/user.service';
import { API_URL } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public loggedUser: BehaviorSubject<User>;

  constructor(private httpService: HttpClient, private userService: UserService) {
    this.loggedUser = new BehaviorSubject(null);
  }

  executeAuthenticationService(username, password, skipUserDetails?): Promise<any> {
    return this.httpService.post<any>(API_URL + '/authenticate', { username, password }).pipe(
      map(
        data => {
            localStorage.setItem('AUTHENTICATED_USER', username);
            localStorage.setItem('TOKEN', `Bearer ${data.token}`);
            if (!skipUserDetails) {
              this.userService.getUserDetails(username).toPromise().then(user => {
                this.loggedUser.next(user);
              });
            }
            return data;
          }
      )
    ).toPromise();
  }

  getAuthenticatedUser(): string {
    return localStorage.getItem('AUTHENTICATED_USER');
  }

  getAuthenticatedToken(): string {
    return localStorage.getItem('TOKEN');
  }

  isUserLoggedIn(): boolean {
    return this.getAuthenticatedUser() != null;
  }

  logout(): void {
    localStorage.removeItem('AUTHENTICATED_USER');
    localStorage.removeItem('TOKEN');
    this.loggedUser.next(null);
  }
}


export class AuthenticationBean {
  constructor(public message: string) {}
}
