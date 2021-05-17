import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { SignService } from 'src/app/service/rest-api/sign.service';

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
      userId: new FormControl('', Validators.compose([
        Validators.required
      ])),
      userPwd: new FormControl('', [Validators.required,
        Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$')
      ]), // 최소 1개의 숫자, 소문자, 대문자, 특수문자 필요 합니다
      userPwd_Re: new FormControl('', [Validators.required,
        Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$')
      ]),
      userName: new FormControl('', [Validators.required])
    }, {validator: this.checkPassword});
  }

  // tslint:disable-next-line:typedef
  checkPassword(group: FormGroup) {
    const userPwd = group.controls.userPwd.value;
    const userPwdRe = group.controls.userPwd_Re.value;
    return userPwd === '' || userPwdRe === '' || userPwd === userPwdRe ? null : { notSame : true };
  }

  // tslint:disable-next-line:typedef
  get f() {
    return this.signUpForm.controls;
  }

  // tslint:disable-next-line:typedef
  submit() {
    if (this.signUpForm.valid) {
      this.signService.signUp(this.signUpForm.value.userId, this.signUpForm.value.userPwd, this.signUpForm.value.userName)
        .then( response => {
          // 가입 완료후 자동로그인
          this.signService.signIn(this.signUpForm.value.userId, this.signUpForm.value.userPwd)
            // tslint:disable-next-line:no-shadowed-variable
            .then(response => {
              this.router.navigate(['/']);
            });
        });
    }
  }
}
