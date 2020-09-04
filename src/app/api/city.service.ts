import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { City } from './types';
import { GenericAPIService } from './generic-api.service';
import { catchError } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class CityService extends GenericAPIService {
    public path = '/city';

    public getCities(): Observable<City[]> {
        return this.httpService
            .get<City[]>(this.endpoint + '/all')
            .pipe(catchError(this.handleError));
    }
}
