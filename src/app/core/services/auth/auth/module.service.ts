import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponse } from 'src/app/core/data/common/api-response';
import { HttpClientService } from 'src/app/core/helpers/http-client-service';
import { Module } from '../../../data/auth/auth/module';

@Injectable({
    providedIn: 'root'
})
export class ModuleService {

    private url = 'identity/modules';

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

    create(Module: Module): Observable<ApiResponse> {
        return this.http.post(this.url, Module);
    }

    update(id: number, Module: Module): Observable<ApiResponse> {
        return this.http.put(`${this.url}/${id}`, Module);
    }

    delete(id: number): Observable<ApiResponse> {
        return this.http.delete(`${this.url}/${id}`);
    }
}
