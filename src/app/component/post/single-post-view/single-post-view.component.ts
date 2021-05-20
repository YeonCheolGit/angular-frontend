import { MyInfoService } from 'src/app/service/rest-api/myInfo/myinfo.service';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/model/myinfo/User';
import { Post } from 'src/app/model/board/Post';
import { ActivatedRoute } from '@angular/router';
import { BoardService } from 'src/app/service/rest-api/board/board.service';
import { SignService } from 'src/app/service/rest-api/sign/sign.service';

@Component({
  selector: 'app-post-view',
  templateUrl: './single-post-view.component.html',
  styleUrls: ['./single-post-view.component.css']
})
export class SinglePostViewComponent implements OnInit {

  loginUser: User;
  boardName: string;
  postNo: number;
  post: Post;

  constructor(private route: ActivatedRoute,
              private boardService: BoardService,
              public signService: SignService,
              private myInfoService: MyInfoService) {
    this.boardName = this.route.snapshot.params['boardName'];
    this.postNo = this.route.snapshot.params['postNo'];
  }

  // tslint:disable-next-line:typedef
  ngOnInit() {
    if (this.signService.signInCheck()) {
      this.myInfoService.getUser()
        .then(user => {
          this.loginUser = user;
        });
    }
    this.boardService.viewSinglePost(this.postNo)
      .then(post => {
        this.post = post;
      });
  }
}
