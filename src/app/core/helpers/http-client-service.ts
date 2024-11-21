import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from "../../../environments/environment";
import { ApiResponse } from '../../../../src/app/core/data/common/api-response';
import { HttpFormData } from '../data/common/http-form-data';
import { formatDate } from '@angular/common';


@Injectable({
  providedIn: 'root'
})

export class HttpClientService {

  API_URL = environment.apiUrl;

  constructor(private http: HttpClient) { }

  get(url: string): Observable<ApiResponse> {
    url = this.API_URL + url;
    return this.http.get<ApiResponse>(url).pipe(
      map((response: any) => response as ApiResponse),
    );
  }

  post(url: string, data: any): Observable<ApiResponse> {
    url = this.API_URL + url;
    return this.http.post<ApiResponse>(url, data).pipe(
      map((response: any) => response as ApiResponse),
    );
  }

  put(url: string, data: any): Observable<ApiResponse> {
    url = this.API_URL + url;
    return this.http.put<ApiResponse>(url, data).pipe(
      map((response: any) => response as ApiResponse),
    );
  }

  delete(url: string): Observable<ApiResponse> {
    url = this.API_URL + url;
    return this.http.delete<ApiResponse>(url).pipe(
      map((response: any) => response as ApiResponse),
    );
  }

  postFiles(url: string, data: any): Observable<ApiResponse> {
    url = this.API_URL + url;
    const headers = new HttpHeaders({
      'Accept': 'application/json'
    });
    const formData = this.buildFormData(data);
    return this.http.post<ApiResponse>(url, formData, { headers }).pipe(
      map((response: any) => response as ApiResponse),
    );
  }

  putFiles(url: string, data: any): Observable<ApiResponse> {
    url = this.API_URL + url;
    const headers = new HttpHeaders({
      'Accept': 'application/json'
    });
    const formData = this.buildFormData(data);
    return this.http.put<ApiResponse>(url, formData, { headers }).pipe(
      map((response: any) => response as ApiResponse),
    );
  }



  
  private buildFormData(data: any): FormData {
    const formData = new FormData();
    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        if (data[key] instanceof File) {
          formData.append(key, data[key], data[key].name);
        } else if (data[key] instanceof Date) {
          formData.append(key, this.formatDateForBackend(data[key]));
        } else {
          formData.append(key, data[key]);
        }
      }
    }
    return formData;
  }
  
  private formatDateForBackend(date: Date): string {
    return formatDate(date, 'yyyy-MM-dd', 'en-US');
  }
}
