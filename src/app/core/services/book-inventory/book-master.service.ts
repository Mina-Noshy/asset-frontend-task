import { Injectable } from '@angular/core';
import { HttpClientService } from '../../helpers/http-client-service';
import { Observable } from 'rxjs';
import { ApiResponse } from '../../data/common/api-response';
import { BookMaster } from '../../data/book-inventory/book-master';

@Injectable({
  providedIn: 'root'
})
export class BookMasterService {
  
  private url = 'v2/bookinventory/bookmaster';

  constructor(private http: HttpClientService) { }

  getAll(pageNumber: number = 1, pageSize: number = 10, searchTerm: string | null = null): Observable<ApiResponse> {
      let urlWithQueryParam = `${this.url}?PageNumber=${pageNumber}&PageSize=${pageSize}`;

      if (searchTerm !== null && searchTerm!== "") {
          urlWithQueryParam += `&searchTerm=${encodeURIComponent(searchTerm)}`;
      }

      return this.http.get(urlWithQueryParam);
  }

  getById(id: number): Observable<ApiResponse> {
      return this.http.get(`${this.url}/${id}`);
  }

  create(city: BookMaster): Observable<ApiResponse> {
      return this.http.post(this.url, city);
  }

  update(id: number, city: BookMaster): Observable<ApiResponse> {
      return this.http.put(`${this.url}/${id}`, city);
  }

  delete(id: number): Observable<ApiResponse> {
      return this.http.delete(`${this.url}/${id}`);
  }
}
