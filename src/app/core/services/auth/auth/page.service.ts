import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponse } from 'src/app/core/data/common/api-response';
import { HttpClientService } from 'src/app/core/helpers/http-client-service';
import { Page } from '../../../data/auth/auth/page';

@Injectable({
    providedIn: 'root'
})
export class PageService {

    private url = 'identity/pages';

    constructor(private http: HttpClientService) { }

    getAll(): Observable<ApiResponse> {
        return this.http.get(this.url);
    }

    getLight(menuId: number): Observable<ApiResponse> {
        return this.http.get(`${this.url}/light/${menuId}`);
    }

    getById(id: number): Observable<ApiResponse> {
        return this.http.get(`${this.url}/${id}`);
    }

    create(page: Page): Observable<ApiResponse> {
        return this.http.post(this.url, page);
    }

    update(id: number, page: Page): Observable<ApiResponse> {
        return this.http.put(`${this.url}/${id}`, page);
    }

    delete(id: number): Observable<ApiResponse> {
        return this.http.delete(`${this.url}/${id}`);
    }
}
