import { Injectable, isDevMode } from '@angular/core';

import { throwError, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { API_URL } from 'src/environments/environment';

@Injectable()
export class GenericAPIService {
    public path: string;

    constructor(protected httpService: HttpClient) {
    }

    protected get endpoint(): string {
        return API_URL + this.path;
    }

    protected handleError(error: Response | any): Observable<never> {
        console.error('GenericRESTService::handleError', error);
        return throwError(error);
    }
}
