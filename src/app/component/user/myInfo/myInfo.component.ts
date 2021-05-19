import { Component } from '@angular/core';
import { MyInfoService } from 'src/app/service/rest-api/myInfo/myinfo.service';
import {User} from 'src/app/model/myinfo/User';

@Component({
  selector: 'app-my-info',
  templateUrl: './myInfo.component.html',
  styleUrls: ['./myInfo.component.css']
})
export class MyInfoComponent{
  loginUser: User;

  constructor(private myInfoService: MyInfoService) {
    this.myInfoService.getUser().then(user => {
      this.loginUser = user;
    });
  }
}
