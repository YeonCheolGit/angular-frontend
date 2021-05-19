import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiValidationService } from 'src/app/model/common/api-validation/api-validation.service';
import { Post } from 'src/app/model/board/Post';
import { ApiResponseList } from 'src/app/model/common/ApiResponseList';
import { ApiResponseSingle } from 'src/app/model/common/ApiResponseSingle';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class BoardService {

  constructor(private http: HttpClient,
              private apiValidationService: ApiValidationService,
              private router: Router) {
  }

  private getBoardUrl = '/api/v1/board';

  // 게시글 리스트 조회
  getPosts(boardName: string): Promise<Post[]> {
    const getPostsUrl = this.getBoardUrl + '/' + boardName + '/posts';
    return this.http.get<ApiResponseList>(getPostsUrl)
      .toPromise()
      .then(this.apiValidationService.validateResponse)
      .then(response => {
        return response.list as Post[];
      })
      .catch(response => {
        alert(response.error.msg);
        return Promise.reject(response.error.msg);
      });
  }

  // 게시글 작성
  addPost(boardName: string, author: string, title: string, content: string): Promise<Post> {
    const postUrl = this.getBoardUrl + '/' + boardName + '/post';
    const params = new FormData();
    params.append('author', author);
    params.append('title', title);
    params.append('content', content);
    return this.http.post<ApiResponseSingle>(postUrl, params)
      .toPromise()
      .then(this.apiValidationService.validateResponse)
      .then(response => {
        return response.data as Post;
      })
      .catch(response => {
        if (response.error.status === 403) {
          console.log('토큰 만료 에러 >>> ' + response.error.msg + response.error.status);
          localStorage.removeItem('x-auth-token');
          localStorage.removeItem('loginUser');
          this.router.navigate(['/']);
        } else {
          alert('게시글 작성 중 에러가 발생했습니다.');
          console.log('게시글 작성 중 에러 >>> ' + response.error.msg + response.error.status);
        }
        return Promise.reject(response.error.msg);
      });
  }
}

