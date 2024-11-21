import { Injectable } from '@angular/core';
import { HttpClientService } from '../../helpers/http-client-service';
import { ApiResponse } from '../../data/common/api-response';
import { Observable } from 'rxjs';
import { BookCategory } from '../../data/book-inventory/book-category';

@Injectable({
    providedIn: 'root'
})
export class BookCategoryService {


    private url = 'v2/bookinventory/bookcategories';

    constructor(private http: HttpClientService) { }

    getAll(pageNumber: number = 1, pageSize: number = 10, searchTerm: string | null = null): Observable<ApiResponse> {
        let urlWithQueryParam = `${this.url}?PageNumber=${pageNumber}&PageSize=${pageSize}`;

        if (searchTerm !== null && searchTerm!== "") {
            urlWithQueryParam += `&searchTerm=${encodeURIComponent(searchTerm)}`;
        }

        return this.http.get(urlWithQueryParam);
    }

    getAsDropdown(): Observable<ApiResponse> {
        return this.http.get(`${this.url}/dropdown`);
    }

    getById(id: number): Observable<ApiResponse> {
        return this.http.get(`${this.url}/${id}`);
    }

    create(city: BookCategory): Observable<ApiResponse> {
        return this.http.post(this.url, city);
    }

    update(id: number, city: BookCategory): Observable<ApiResponse> {
        return this.http.put(`${this.url}/${id}`, city);
    }

    delete(id: number): Observable<ApiResponse> {
        return this.http.delete(`${this.url}/${id}`);
    }

}
