import { Injectable } from '@angular/core';
import { UserTokenResponse } from '../../../data/auth/account/user-token';
import { Observable } from 'rxjs';
import { LocalStorageService } from '../../common/local-storage.service';
import { HttpClientService } from '../../../helpers/http-client-service';
import { ApiResponse } from '../../../data/common/api-response';

@Injectable({
    providedIn: 'root'
})

export class AuthService {

    private url = 'v1/auth/auth';

    constructor(private tokenStorageService: LocalStorageService,
        private http: HttpClientService) {
    }

    login(_username: string, _password: string, _companyNo: string): Observable<ApiResponse> {
        return this.http.post(`${this.url}/get-token`, {
            username: _username,
            password: _password,
            companyNo: _companyNo
        });
    }

    getUserModules(): Observable<ApiResponse> {
        return this.http.get(`${this.url}/user-modules`);
    }

    getUserModulePages(moduleId: number): Observable<ApiResponse> {
        return this.http.get(`${this.url}/user-module-pages/${moduleId}`);
    }

    refreshToken(token: string): Observable<ApiResponse> {
        return this.http.post(`${this.url}/refresh-token`, {
            token: token,
        });
    }

    public currentUser(): UserTokenResponse | null {
        return this.tokenStorageService.getUserDetails();
    }

    logout(): void {
        this.tokenStorageService.signOut();
    }

    addUserRole(userId: string, role: string): Observable<ApiResponse> {
        return this.http.post(`${this.url}/add-user-role`,
            {
                userId: userId,
                role: role
            });
    }
    removeUserRole(userId: string, role: string): Observable<ApiResponse> {
        return this.http.post(`${this.url}/remove-user-role`,
            {
                userId: userId,
                role: role
            });
    }

}

