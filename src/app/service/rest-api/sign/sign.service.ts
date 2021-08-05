import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpParams} from '@angular/common/http';
import {ApiResponseSingle} from 'src/app/model/common/ApiResponseSingle';
import {ApiValidationService} from 'src/app/model/common/api-validation/api-validation.service';


@Injectable({
  providedIn: 'root'
})
export class SignService {

  private readonly signInUrl = '/api/v1/sign/signIn';
  private readonly signUpUrl = '/api/v1/sign/signUp';
  private readonly getKakaoAuthCodeUrl = '/api/v1/social/getKakaoAuthCode';
  private readonly signAuthcode = '/api/v1/sign/kakaoAuthCode';

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

  /*
   * 카카오 회원가입 버튼 클릭 시 동작 합니다.
   * 서버에게 '카카오 인가코드 요청 URI'를 요청 합니다.
   */
  async getKakaoAuthCode(): Promise<any> {
    return this.http.get<ApiResponseSingle>(this.getKakaoAuthCodeUrl)
      .toPromise()
      .then(async response => {
        location.replace(response.data); // 응답 받은 후 카카오 로그인 페이지로 이동 합니다.
      });
  }

  // 카카오 API가 발급한 인가 코드를 바탕으로 회원가입 핸들러(서버) 요청합니다.
  async signUpOrInByKakaoAuthCode(paramCode: string): Promise<any> {
    const params = new FormData();
    params.append('code', paramCode); // 인가코드를 파라미터에 저장
    return this.http.post(this.signAuthcode, params) // 회원가입 POST 요청
      .toPromise()
      .then(this.apiValidationService.validateResponse)
      .then(response => {
        switch (response.status) {
          case 200: { // 이미 회원가입 된 회원으로서, 서버에서 로그인 메서드 진행 후 응답 합니다.
            return localStorage.setItem('x-auth-token', response.data);
          }
          case 201: { // 정상적인 회원가입 진행 후 응답 입니다.
            return alert('회원가입 완료 되었습니다.');
          }
        }
      })
      .catch(error => {
        alert('회원가입 과정에서 에러가 발생 했습니다. 다시 시도해주세요.');
        console.log(error.error.msg);
        return Promise.reject(error.error.msg);
      });
  }

  // 일반적인 회원가입 합니다
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
