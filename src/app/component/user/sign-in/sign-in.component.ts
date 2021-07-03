import {Component, OnInit} from '@angular/core';
import {SignService} from 'src/app/service/rest-api/sign/sign.service';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {Router, ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  redirectTo: string;
  signInForm: FormGroup;

  constructor(private signService: SignService,
              private router: Router,
              private route: ActivatedRoute) {
    this.signInForm = new FormGroup({
      userId: new FormControl('', [Validators.required, Validators.email]),
      userPwd: new FormControl('', [Validators.required,
        Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$')]) // 최소 1개의 숫자, 소문자, 대문자, 특수문자 필요 합니다
    });
  }

  get userIdValid(): AbstractControl {
    return this.signInForm.get('userId');
  }

  get userPwdValid(): AbstractControl {
    return this.signInForm.get('userPwd');
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.redirectTo = params['redirectTo'];
    });
  }

  submit(): void {
    if (this.signInForm.valid) {
      this.signService.signIn(this.signInForm.value.userId, this.signInForm.value.userPwd)
        .then(data => {
          this.router.navigate([this.redirectTo ? this.redirectTo : '/']);
        });
    }
  }

  signInKakaoButton(): any { // 카카오 회원가입 버튼 클릭 시 동작 합니다.
    this.signService.getKakaoAuthCode() // 카카오 '인가코드 요청 URI'를 서버로 요청 합니다.
      .then(data => {
        console.log(data);
      });
  }
}
