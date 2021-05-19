import {Component, OnInit} from '@angular/core';
import {SignService} from 'src/app/service/rest-api/sign/sign.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
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

  // tslint:disable-next-line:typedef
  get userIdValid() {
    return this.signInForm.get('userId');
  }
  // tslint:disable-next-line:typedef
  get userPwdValid() {
    return this.signInForm.get('userPwd');
  }

  // tslint:disable-next-line:typedef
  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.redirectTo = params['redirectTo'];
    });
  }

  // tslint:disable-next-line:typedef
  submit() {
    if (this.signInForm.valid) {
      this.signService.signIn(this.signInForm.value.userId, this.signInForm.value.userPwd)
        .then(data => {
          this.router.navigate([this.redirectTo ? this.redirectTo : '/']);
        });
    }
  }
}
