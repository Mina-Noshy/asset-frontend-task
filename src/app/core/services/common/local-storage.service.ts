import { Injectable } from '@angular/core';
import { UserTokenResponse } from '../../data/auth/account/user-token';



// local storage keys
const ACCESS_TOKEN_KEY = 'access-token';
const REFRESH_TOKEN_KEY = 'refresh-token';
const USER_DETAILS_KEY = 'user-details';




@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  constructor() { }

  // signOut - clear local storage 
  signOut(): void {
    window.sessionStorage.clear();
  }




  // refresh token
  public setRefreshToken(token: string): void {
    window.sessionStorage.removeItem(REFRESH_TOKEN_KEY);
    window.sessionStorage.setItem(REFRESH_TOKEN_KEY, token);
  }

  public getRefreshToken(): string | null {
    return sessionStorage.getItem(REFRESH_TOKEN_KEY);
  }


  // access token
  public setAccessToken(token: string): void {
    window.sessionStorage.removeItem(ACCESS_TOKEN_KEY);
    window.sessionStorage.setItem(ACCESS_TOKEN_KEY, token);
  }

  public getAccessToken(): string | null {
    return sessionStorage.getItem(ACCESS_TOKEN_KEY);
  }


  // user details
  public setUserDetails(user: UserTokenResponse): void {
    window.sessionStorage.removeItem(USER_DETAILS_KEY);
    window.sessionStorage.setItem(USER_DETAILS_KEY, JSON.stringify(user));
  }

  public getUserDetails(): UserTokenResponse | null {
    const user = window.sessionStorage.getItem(USER_DETAILS_KEY);
    if (user) {
      return JSON.parse(user);
    }
    return null;
  }


}
