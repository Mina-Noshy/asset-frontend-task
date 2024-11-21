import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClientService } from '../../../helpers/http-client-service';
import { RolePage } from '../../../data/identity/auth/rolePage';
import { ApiResponse } from '../../../data/common/api-response';

@Injectable({
    providedIn: 'root'
})

export class RolePageService {

    private url = 'identity/rolepages';

    constructor(private http: HttpClientService) { }

    getAll(): Observable<ApiResponse> {
        return this.http.get(this.url);
    }

    getById(id: number): Observable<ApiResponse> {
        return this.http.get(`${this.url}/${id}`);
    }

    create(rolePage: RolePage): Observable<ApiResponse> {
        return this.http.post(this.url, rolePage);
    }

    update(id: number, rolePage: RolePage): Observable<ApiResponse> {
        return this.http.put(`${this.url}/${id}`, rolePage);
    }

    delete(id: number): Observable<ApiResponse> {
        return this.http.delete(`${this.url}/${id}`);
    }
}
