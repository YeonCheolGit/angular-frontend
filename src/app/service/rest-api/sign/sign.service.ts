import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiResponseSingle } from 'src/app/model/common/ApiResponseSingle';
import { ApiValidationService } from 'src/app/model/common/api-validation/api-validation.service';


@Injectable({
  providedIn: 'root'
})
export class SignService {

  private readonly home = '';
  private readonly signInUrl = '/api/v1/signIn';
  private readonly signUpUrl = '/api/v1/signUp';
  private readonly getKakaoAuthCode = '/social/login/kakaoAuthCode';

  constructor(private http: HttpClient,
              private apiValidationService: ApiValidationService) {}

  // 로그인 합니다
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

  // 카카오 회원 가입 합니다
  signUpKakaoButton(): Promise<any> {
    return this.http.get<ApiResponseSingle>(this.getKakaoAuthCode)
      .toPromise()
      .then(async response => {
        window.open(response.data);
        return this.http.get(this.home);
      });
  }

  // 회원가입 합니다
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

  // 현재 로그인 되어 있는지 토큰을 확인합니다
  signInCheck(): boolean {
    const token = localStorage.getItem('x-auth-token');
    if (token) {
      return true;
    } else {
      return false;
    }
  }
}
