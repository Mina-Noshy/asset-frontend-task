import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponse } from 'src/app/core/data/common/api-response';
import { HttpClientService } from 'src/app/core/helpers/http-client-service';
import { Menu } from '../../../data/auth/auth/menu';

@Injectable({
    providedIn: 'root'
})
export class MenuService {

    private url = 'identity/menus';

    constructor(private http: HttpClientService) { }

    getAll(): Observable<ApiResponse> {
        return this.http.get(this.url);
    }

    getLight(moduleId: number): Observable<ApiResponse> {
        return this.http.get(`${this.url}/light/${moduleId}`);
    }

    getById(id: number): Observable<ApiResponse> {
        return this.http.get(`${this.url}/${id}`);
    }

    create(Menu: Menu): Observable<ApiResponse> {
        return this.http.post(this.url, Menu);
    }

    update(id: number, menu: Menu): Observable<ApiResponse> {
        return this.http.put(`${this.url}/${id}`, menu);
    }

    delete(id: number): Observable<ApiResponse> {
        return this.http.delete(`${this.url}/${id}`);
    }
}
