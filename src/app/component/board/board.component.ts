import {Component, OnInit} from '@angular/core';
import {Post} from 'src/app/model/board/Post';
import {User} from 'src/app/model/myinfo/User';
import {BoardService} from '../../service/rest-api/board/board.service';
import {ActivatedRoute, Router} from '@angular/router';
import {SignService} from 'src/app/service/rest-api/sign/sign.service';
import {MyInfoService} from 'src/app/service/rest-api/myInfo/myinfo.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {

  public posts: Post[] = [];
  public displayedColumns: string[] = ['postNo', 'title', 'author', 'createdAt', 'modifiedAt'];
  public boardName: string;
  loginUser: User;

  constructor(private boardService: BoardService,
              private route: ActivatedRoute,
              public signService: SignService,
              private myInfoService: MyInfoService) {
    this.boardName = this.route.snapshot.params['boardName'];
  }

  // tslint:disable-next-line:typedef
  ngOnInit() {
    this.boardService.getPosts(this.boardName).then(response => {
      this.posts = response;
    });

    if (this.signService.signInCheck()) {
      this.myInfoService.getUser()
        .then(user => {
          this.loginUser = user;
        });
    }
  }

  // tslint:disable-next-line:typedef
  delete(postNo: number) {
    if (confirm('정말 삭제하시겠습니까?\n' + '삭제된 글은 복구할 수 없습니다.')) {
      this.boardService.deletePost(postNo).then(response => {
        window.location.reload();
      });
    }
  }
}
