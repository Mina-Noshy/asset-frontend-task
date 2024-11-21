import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClientService } from '../../../helpers/http-client-service';
import { ApiResponse } from '../../../data/common/api-response';


@Injectable({
  providedIn: 'root'
})

export class AccountService {

  private url = 'v1/auth/accounts';

  constructor(private http: HttpClientService) {

  }


  register(firstName: String, 
    lastName: String, 
    userName: String, 
    email: String, 
    phoneNumber: String, 
    password: String,
    role: String
  ): Observable<ApiResponse> {
    return this.http.post(`${this.url}/create-user`, {
      firstName: firstName,
      lastName: lastName,
      userName: userName,
      email: email,
      phoneNumber: phoneNumber,
      password: password,
      role: role,
    });
  }

  getUers(take: number, skip: number): Observable<ApiResponse> {


    return this.http.post(`${this.url}/get-users`,
      {
        take: take,
        skip: skip
      });
  }

}
