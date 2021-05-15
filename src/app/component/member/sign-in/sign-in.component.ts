import {Component} from '@angular/core';
import {SignService} from 'src/app/service/rest-api/sign.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent {

  signInForm: FormGroup;

  constructor(private signService: SignService) {
    this.signInForm = new FormGroup({
      userId: new FormControl('', [Validators.required, Validators.email]),
      userPwd: new FormControl('', [Validators.required])
    });
  }

  // tslint:disable-next-line:typedef
  get userId() {
    return this.signInForm.get('userId');
  }

  // tslint:disable-next-line:typedef
  get userPwd() {
    return this.signInForm.get('userPwd');
  }

  // tslint:disable-next-line:typedef
  submit() {
    if (this.signInForm.valid) {
      this.signService.signIn(this.signInForm.value.userId, this.signInForm.value.userPwd)
        .then(data => {
          alert('로그인에 성공하였습니다');
        })
        .catch(response => {
          alert('로그인에 실패하였습니다 - ' + response.error.msg);
        });
    }
  }
}
