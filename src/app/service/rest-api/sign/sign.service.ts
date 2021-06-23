import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ApiResponseSingle} from 'src/app/model/common/ApiResponseSingle';
import {ApiValidationService} from 'src/app/model/common/api-validation/api-validation.service';


@Injectable({
  providedIn: 'root'
})
export class SignService {

  private readonly signInUrl = '/api/v1/signIn';
  private readonly signUpUrl = '/api/v1/signUp';
  private readonly getKakaoAuthCodeUrl = '/social/login/kakaoAuthCode';
  private readonly signUpKakaoAuthcode = '/api/v1/signUp/kakaoAuthCode';

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
  getKakaoAuthCode(): Promise<any> {
    return this.http.get<ApiResponseSingle>(this.getKakaoAuthCodeUrl)
      .toPromise()
      .then(response => {
        window.open(response.data);
      });
  }

  /*
   * 카카오 API가 발급한 인가 코드를 바탕으로 회원가입 핸들러(서버) 요청합니다.
   */
  signUpKakaoAuth(paramCode: string): Promise<any> {
    const params = new FormData();
    params.append('code', paramCode); // 인가코드
    return this.http.post(this.signUpKakaoAuthcode, params)
      .toPromise()
      .then(response => {
        alert(response + '성공!');
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
