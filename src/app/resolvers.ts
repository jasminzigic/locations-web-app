import { Injectable } from '@angular/core';

import { Resolve, ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from './services/auth.service';
import { City, User, LocationDetails } from './api/types';
import { CityService } from './api/city.service';
import { LocationService } from './api/location.service';
import { UserService } from './api/user.service';
import { Observable } from 'rxjs';

@Injectable()
export class CitiesResolver implements Resolve<City[]> {
  constructor(private cityService: CityService) {}
  resolve(route: ActivatedRouteSnapshot): Observable<City[]> {
    return this.cityService.getCities();
  }
}

@Injectable()
export class LocationsResolver implements Resolve<LocationDetails[]> {
  constructor(private locationService: LocationService, private route: ActivatedRoute) {}
  resolve(route: ActivatedRouteSnapshot): Observable<LocationDetails[]> {
    return this.locationService.getLocations();
  }
}

@Injectable()
export class LocationResolver implements Resolve<LocationDetails> {
  constructor(private locationService: LocationService, private route: ActivatedRoute) {}
  resolve(route: ActivatedRouteSnapshot): Observable<LocationDetails> {
    const id = route.params.id;
    return this.locationService.getLocation(id);
  }
}

@Injectable()
export class UserResolver implements Resolve<User> {
  constructor(private userService: UserService, private authService: AuthService, private route: ActivatedRoute) {}
  resolve(route: ActivatedRouteSnapshot): Promise<User> {
    return this.userService.getUserDetails(this.authService.getAuthenticatedUser()).toPromise().then(user => {
      this.authService.loggedUser.next(user);
      return user;
    }).catch((err) => {
      this.authService.logout();
      return null;
    });
  }

}

