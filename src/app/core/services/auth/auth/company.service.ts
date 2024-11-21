import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponse } from 'src/app/core/data/common/api-response';
import { CreateCompany } from 'src/app/core/data/auth/auth/createCompany';
import { HttpClientService } from 'src/app/core/helpers/http-client-service';

@Injectable({
    providedIn: 'root'
})
export class CompanyService {

    private url = 'hr/companies';

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

    create(company: CreateCompany): Observable<ApiResponse> {
        return this.http.postFiles(this.url, company);
    }

    update(id: number, company: CreateCompany): Observable<ApiResponse> {
        return this.http.putFiles(`${this.url}/${id}`, company);
    }

    delete(id: number): Observable<ApiResponse> {
        return this.http.delete(`${this.url}/${id}`);
    }
}
