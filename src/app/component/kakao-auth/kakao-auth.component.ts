import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {SignService} from 'src/app/service/rest-api/sign/sign.service';

@Component({
  selector: 'app-kakao-auth',
  templateUrl: './kakao-auth.component.html',
  styleUrls: ['./kakao-auth.component.css']
})
export class KakaoAuthComponent implements OnInit {
  private paramCode: string; // 카카오 인가 코드 저장

  constructor(private signService: SignService,
              private route: ActivatedRoute) { }

  // 카카오 인가 코드(paramCode) 바탕으로 회원가입 메소드 입니다.
  signUpKakaoAuth(): any {
    this.signService.signUpKakaoAuth(this.paramCode);
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => { // 카카오 API로 부터 받은 URL 파라미터에서 'code' 파싱 합니다.
      this.paramCode = params['code'];
    });
    this.signUpKakaoAuth();
  }
}
