import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-logout',
  templateUrl: 'logout.component.html',
  styleUrls: ['logout.component.css']
})

export class LogoutComponent implements OnInit {

  constructor(private router: Router) {
    this.logout();
  }

  ngOnInit(): void {
  }

  logout(): void {
    localStorage.removeItem('x-auth-token');
    localStorage.removeItem('loginUser');
    this.router.navigate(['']).then(r => alert('로그아웃 되었습니다.'));
  }
}
