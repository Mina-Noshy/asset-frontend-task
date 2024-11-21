import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
} from '@angular/common/http';
import { catchError, switchMap } from 'rxjs/operators';
import { Observable, throwError, of } from 'rxjs';
import { LocalStorageService } from '../services/common/local-storage.service';
import { AuthService } from '../services/auth/auth/auth.service';
import { environment } from '../../../../src/environments/environment';
import { ApiResponse } from '../data/common/api-response';
import { Router } from '@angular/router';

@Injectable()
export class HttpRequestInterceptor implements HttpInterceptor {
  API_KEY = environment.apiKey;

  constructor(
    private router: Router,
    private tokenService: LocalStorageService,
    private authService: AuthService
  ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const accessToken = this.tokenService.getAccessToken();
    const authRequest = this.addRequestHeaders(request, accessToken??'');

    return next.handle(authRequest).pipe(
      catchError((err) => this.handleError(err, request, next))
    );
  }

  private handleError(err: any, request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (err.status === 401) {
      return this.handleRefreshToken(request, next);
    }
    return this.handleCommonErrors(err);
  }

  private handleRefreshToken(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const refreshToken = this.tokenService.getRefreshToken();

    return this.authService.refreshToken(refreshToken??'').pipe(
      switchMap((response: ApiResponse) => {
        this.updateTokens(response.data);
        return next.handle(this.addRequestHeaders(request, response.data.accessToken));
      }),
      catchError((error) => this.handleTokenRefreshError(error))
    );
  }

  private handleTokenRefreshError(error: any): Observable<never> {
    this.authService.logout();
    alert('Your session has expired! Please log in again.');
    this.router.navigate(['/auth/login']);
    return of(); // Use of() to return an empty observable
  }

  private updateTokens(data: any): void {
    this.tokenService.setAccessToken(data.accessToken);
    this.tokenService.setRefreshToken(data.refreshToken);
    this.tokenService.setUserDetails(data);
  }

  private handleCommonErrors(err: any): Observable<never> {
    console.error('An error occurred:', err);
    return of(); // Use 'of()' to return an empty observable
  }

  private addRequestHeaders(request: HttpRequest<any>, token: string): HttpRequest<any> {
    return request.clone({
      headers: request.headers
        .set('Authorization', `Bearer ${token}`)
        .set('apiKey', this.API_KEY),
    });
  }
}
