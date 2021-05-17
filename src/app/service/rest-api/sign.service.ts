import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiResponseSingle } from 'src/app/model/common/ApiResponseSingle';
import {ApiValidationService} from 'src/app/model/common/api-validation/api-validation.service';


@Injectable({
  providedIn: 'root'
})
export class SignService {

  private signInUrl = '/api/v1/signIn';
  private signUpUrl = '/api/v1/signUp';

  constructor(private http: HttpClient,
              private apiValidationService: ApiValidationService) {}

  signIn(userId: string, userPwd: string): Promise<any> {
    const params = new FormData();
    params.append('userId', userId);
    params.append('userPwd', userPwd);
    return this.http.post<ApiResponseSingle>(this.signInUrl, params)
      .toPromise()
      .then(this.apiValidationService.validateResponse)
      .then(response => {
        localStorage.setItem('x-auth-token', response.data);
      })
      .catch(response => {
        alert(response.error.msg);
        return Promise.reject(response.error.msg);
      });
  }

  signUp(userId: string, userPwd: string, userName: string): Promise<any> {
    const params = new FormData();
    params.append('userId', userId);
    params.append('userPwd', userPwd);
    params.append('userName', userName);
    return this.http.post<ApiResponseSingle>(this.signUpUrl, params)
      .toPromise()
      .then(this.apiValidationService.validateResponse)
      .then(response => {
        return true;
      })
      .catch(response => {
        alert(response.error.msg);
        return Promise.reject(response.error.msg);
      });
  }

  singInCheck(): boolean {
    const token = localStorage.getItem('x-auth-token');
    return !!token;
  }
}
