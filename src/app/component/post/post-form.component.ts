import { MyInfoService } from 'src/app/service/rest-api/myInfo/myinfo.service';
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SignService } from 'src/app/service/rest-api/sign/sign.service';
import { BoardService } from 'src/app/service/rest-api/board/board.service';

@Component({
  selector: 'app-post',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.css']
})
export class PostFormComponent {

  boardName: string;
  postForm: FormGroup;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private signService: SignService,
    private myInfoService: MyInfoService,
    private boardService: BoardService
  ) {
    this.postForm = this.formBuilder.group({
      title: new FormControl('', [Validators.required]),
      content: new FormControl('', [Validators.required])
    });
    this.boardName = this.route.snapshot.params['boardName'];
  }

  // tslint:disable-next-line:typedef
  get postFormValid() {
    return this.postForm.controls;
  }

  // tslint:disable-next-line:typedef
  submit() {
    if (this.signService.signInCheck() && this.postForm.valid) {
      this.myInfoService.getUser().then(user => {
        this.boardService.addPost(this.boardName, user.userName, this.postForm.value.title, this.postForm.value.content)
          .then(response => {
            this.router.navigate(['/board/' + this.boardName]);
          });
      });
    }
  }
}
