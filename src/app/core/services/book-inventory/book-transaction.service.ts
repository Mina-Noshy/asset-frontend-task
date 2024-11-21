import { Injectable } from '@angular/core';
import { HttpClientService } from '../../helpers/http-client-service';
import { Observable } from 'rxjs';
import { ApiResponse } from '../../data/common/api-response';

@Injectable({
  providedIn: 'root'
})
export class BookTransactionService {
  private url = 'v2/bookinventory/booktransactions';

  constructor(private http: HttpClientService) { }

  getAllTransactions(pageNumber: number = 1, pageSize: number = 10, searchTerm: string | null = null): Observable<ApiResponse> {
    let urlWithQueryParam = `${this.url}?PageNumber=${pageNumber}&PageSize=${pageSize}`;

    if (searchTerm !== null && searchTerm !== "") {
      urlWithQueryParam += `&searchTerm=${encodeURIComponent(searchTerm)}`;
    }

    return this.http.get(urlWithQueryParam);
  }

  getUserTransactions(pageNumber: number = 1, pageSize: number = 10, searchTerm: string | null = null): Observable<ApiResponse> {
    let urlWithQueryParam = `${this.url}/user-transactions?PageNumber=${pageNumber}&PageSize=${pageSize}`;

    if (searchTerm !== null && searchTerm !== "") {
      urlWithQueryParam += `&searchTerm=${encodeURIComponent(searchTerm)}`;
    }

    return this.http.get(urlWithQueryParam);
  }

  getBookTransactions(bookId: number, pageNumber: number = 1, pageSize: number = 10, searchTerm: string | null = null): Observable<ApiResponse> {
    let urlWithQueryParam = `${this.url}/book-transactions/${bookId}?PageNumber=${pageNumber}&PageSize=${pageSize}`;

    if (searchTerm !== null && searchTerm !== "") {
      urlWithQueryParam += `&searchTerm=${encodeURIComponent(searchTerm)}`;
    }

    return this.http.get(urlWithQueryParam);
  }

}
