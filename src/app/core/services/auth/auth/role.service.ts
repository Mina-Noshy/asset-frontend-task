import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClientService } from '../../../helpers/http-client-service';
import { ApiResponse } from '../../../data/common/api-response';

@Injectable({
    providedIn: 'root'
})

export class RoleService {

    private url = 'identity/roles';

    constructor(private http: HttpClientService) { }

    getAll(): Observable<ApiResponse> {
        return this.http.get(this.url);
    }

    getLight(): Observable<ApiResponse> {
        return this.http.get(`${this.url}/light`);
    }

    getById(id: number): Observable<ApiResponse> {
        return this.http.get(`${this.url}/${id}`);
    }

    create(role: string): Observable<ApiResponse> {
        return this.http.post(this.url, {
            role: role,
        });
    }
    update(id: number, role: string): Observable<ApiResponse> {
        return this.http.put(`${this.url}/${id}`, {
            role: role,
        });
    }

    delete(id: number): Observable<ApiResponse> {
        return this.http.delete(`${this.url}/${id}`);
    }
}
