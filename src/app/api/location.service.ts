import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { LocationDetails } from './types';
import { GenericAPIService } from './generic-api.service';
import { HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class LocationService extends GenericAPIService {
    public path = '/location';

    public getLocations(): Observable<LocationDetails[]> {
        return this.httpService
            .get<LocationDetails[]>(this.endpoint + '/all').pipe(catchError(this.handleError));
    }

    public getLocation(id: number): Observable<LocationDetails> {
        return this.httpService
            .get<LocationDetails>(this.endpoint + '/' + id).pipe(catchError(this.handleError));
    }

    public addNewLocation(location: LocationDetails): Observable<LocationDetails> {
        const headers = new HttpHeaders().append('Content-Type', 'application/json');
        return this.httpService
            .post<LocationDetails>(this.endpoint + '/add', location, { headers })
            .pipe(catchError(this.handleError));
    }

    public updateLocation(location: LocationDetails): Observable<LocationDetails> {
        const headers = new HttpHeaders().append('Content-Type', 'application/json');
        return this.httpService
            .put<LocationDetails>(this.endpoint + '/update', location, { headers })
            .pipe(catchError(this.handleError));
    }

    public deleLocation(id: number): Observable<string> {
        return this.httpService
            .delete<string>(this.endpoint + '/delete/' + id)
            .pipe(catchError(this.handleError));
    }

    public async getAddress(geo: Coordinates): Promise<Observable<string>> {
        const res = await this.httpService
            .get(`https://maps.googleapis.com/maps/api/geocode/json?key=AIzaSyAHzQzBPQ75AuZ1qTmsk8cAkxKBGwQtilg&latlng=${geo.latitude},${geo.longitude}&sensor=true`).toPromise();
        console.log('LocationService -> res', res);
        // tslint:disable-next-line:no-string-literal
        return Promise.resolve(res['results'][0].formatted_address);
    }
}
