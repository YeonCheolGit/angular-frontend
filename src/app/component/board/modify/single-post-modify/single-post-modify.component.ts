import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/model/board/Post';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { BoardService } from 'src/app/service/rest-api/board/board.service';

@Component({
  selector: 'app-single-post-modify',
  templateUrl: './single-post-modify.component.html',
  styleUrls: ['./single-post-modify.component.css']
})
export class SinglePostModifyComponent implements OnInit {

  boardName: string;
  postNo: number;
  post = {} as Post;
  postForm: FormGroup;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private boardService: BoardService,
    private formBuilder: FormBuilder) {
    this.boardName = this.route.snapshot.params['boardName'];
    this.postNo = this.route.snapshot.params['postNo'];
    this.postForm = this.formBuilder.group({
      title: new FormControl('', [Validators.required]),
      content: new FormControl('', [Validators.required])
    });
  }

  // tslint:disable-next-line:typedef
  get postModifyValid() { return this.postForm.controls; }

  // tslint:disable-next-line:typedef
  ngOnInit() {
    this.boardService.viewSinglePost(this.postNo)
      .then(post => {
        this.post = post;
      });
  }

  // tslint:disable-next-line:typedef
  submit() {
    this.boardService.modifyPost(this.post)
        .then(response => {
          this.router.navigate(['/board/' + this.boardName + '/post/' + this.postNo]);
        });
  }
}
