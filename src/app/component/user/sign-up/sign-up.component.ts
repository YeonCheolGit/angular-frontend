import { Component } from '@angular/core';
import {FormGroup, FormControl, Validators, FormBuilder, AbstractControl} from '@angular/forms';
import { Router } from '@angular/router';
import { SignService } from 'src/app/service/rest-api/sign/sign.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {

  signUpForm: FormGroup;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private signService: SignService) {
    this.signUpForm = this.formBuilder.group({
      userId: new FormControl('', Validators.compose([Validators.required, Validators.email])),
      userPwd: new FormControl('', [Validators.required,
        Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$')
      ]), // 최소 1개의 숫자, 소문자, 대문자, 특수문자 필요 합니다
      userPwd_Re: new FormControl('', [Validators.required,
        Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$')
      ]), // 최소 1개의 숫자, 소문자, 대문자, 특수문자 필요 합니다
      userName: new FormControl('', [Validators.required])
    }, {validator: this.checkPassword});
  }

  checkPassword(group: FormGroup): object {
    const userPwd = group.controls.userPwd.value;
    const userPwdRe = group.controls.userPwd_Re.value;
    return userPwd === '' || userPwdRe === '' || userPwd === userPwdRe ? null : { notSame : true };
  }

  // tslint:disable-next-line:typedef
  get signUpFormValid() {
    return this.signUpForm.controls;
  }

  submit(): any {
    if (this.signUpForm.valid) {
      this.signService.signUp(this.signUpForm.value.userId, this.signUpForm.value.userPwd, this.signUpForm.value.userName)
        .then( response => {
          this.signService.signIn(this.signUpForm.value.userId, this.signUpForm.value.userPwd)
            // tslint:disable-next-line:no-shadowed-variable
            .then(response => {
              this.router.navigate(['/']);
            });
        });
    }
  }

  signUpKakaoButton(): any { // 카카오 회원가입 버튼 클릭 시 동작 합니다.
    this.signService.getKakaoAuthCode() // 카카오 '인가코드 요청 URI'를 서버로 요청 합니다.
      .then(data => {
        console.log(data);
      });
  }
}
