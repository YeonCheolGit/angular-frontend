import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiResponseSingle } from 'src/app/model/common/ApiResponseSingle';

@Injectable({
  providedIn: 'root'
})
export class SignService {

  private signInUrl = '/api/v1/signIn';

  constructor(private http: HttpClient) { }

  signIn(userId: string, userPwd: string): Promise<any> {
    const params = new FormData();
    params.append('userId', userId);
    params.append('userPwd', userPwd);
    return this.http.post<ApiResponseSingle>(this.signInUrl, params)
      .toPromise()
      .then(response => {
        localStorage.setItem('x-auth-token', response.data);
      });
  }
}
