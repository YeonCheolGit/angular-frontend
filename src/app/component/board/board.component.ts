import {Component, OnInit} from '@angular/core';
import {Post} from 'src/app/model/board/Post';
import {BoardService} from '../../service/rest-api/board/board.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {

  public posts: Post[] = [];
  public displayedColumns: string[] = ['postNo', 'title', 'author', 'createdAt', 'modifiedAt'];
  public boardName: string;

  constructor(private boardService: BoardService,
              private route: ActivatedRoute) {
    this.boardName = this.route.snapshot.params['boardName'];
  }

  // tslint:disable-next-line:typedef
  ngOnInit() {
    this.boardService.getPosts(this.boardName).then(response => {
      console.log(response);
      this.posts = response;
    });
  }
}
