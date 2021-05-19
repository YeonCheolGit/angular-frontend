import { Injectable } from '@angular/core';
import { ApiResponseSingle } from 'src/app/model/common/ApiResponseSingle';
import { ApiValidationService } from 'src/app/model/common/api-validation/api-validation.service';
import { User } from 'src/app/model/myinfo/User';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MyInfoService {

  constructor(
    private http: HttpClient,
    private apiValidationService: ApiValidationService
  ) { }

  private getUserUrl = '/api/v1/user';

  getUser(): Promise<User> {
    const loginUser = JSON.parse(localStorage.getItem('loginUser'));
    if (loginUser == null) {
      return this.http.get<ApiResponseSingle>(this.getUserUrl)
        .toPromise()
        .then(this.apiValidationService.validateResponse)
        .then(response => {
          localStorage.setItem('loginUser', JSON.stringify(response.data));
          return response.data as User;
        })
        .catch(response => {
          localStorage.removeItem('x-auth-token');
          alert(response.error.msg);
          return Promise.reject(response.error.msg);
        });
    } else {
      return Promise.resolve(loginUser);
    }
  }
}
