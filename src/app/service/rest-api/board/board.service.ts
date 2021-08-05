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

  // 게시글 전체 리스트 조회
  getPosts(boardName: string): Promise<Post[]> {
    const getPostsUrl = this.getBoardUrl + '/' + boardName + '/posts';
    return this.http.get<ApiResponseList>(getPostsUrl)
      .toPromise()
      .then(this.apiValidationService.validateResponse)
      .then(response => {
        return response.list as Post[];
      })
      .catch(response => {
        alert('게시글 불러오는 중 오류가 발생했습니다. 다시 시도해주세요.');
        console.log('게시글 리스트 조회 중 에러 >>> ' + response.error.status + '\n' + response.error.msg);
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
          alert('로그인 시간이 만료되었습니다. 다시 로그인 해주세요.');
          localStorage.removeItem('x-auth-token');
          localStorage.removeItem('loginUser');
          this.router.navigate(['']);
        } else {
          alert('게시글 작성 중 오류가 발생했습니다. 다시 시도해주세요.');
          console.log('게시글 작성 중 에러 >>> ' + response.error.msg + '\n' + response.error.status);
        }
        return Promise.reject(response.error.msg);
      });
  }

  // 게시글 상세보기
  viewSinglePost(postNo: number): Promise<Post> {
    const getPostUrl = this.getBoardUrl + '/post/' + postNo;
    return this.http.get<ApiResponseSingle>(getPostUrl)
      .toPromise()
      .then(this.apiValidationService.validateResponse)
      .then(response => {
        return response.data as Post;
      })
      .catch(response => {
        alert('게시글 상세보기 중 오류가 발생했습니다. 다시 시도해주세요.');
        console.log('게시글 상세 보기 중 에러 >>> ' + response.error.msg + '\n' + response.error.status);
        return Promise.reject(response.error.msg);
      });
  }

  // 게시글 수정
  modifyPost(post: Post): Promise<Post> {
    const postUrl = this.getBoardUrl + '/post/' + post.postNo;
    const params = new FormData();
    params.append('author', post.author);
    params.append('title', post.title);
    params.append('content', post.content);
    return this.http.put<ApiResponseSingle>(postUrl, params)
      .toPromise()
      .then(this.apiValidationService.validateResponse)
      .then(response => {
        return response.data as Post;
      })
      .catch(response => {
        if (response.error.status === 403) {
          console.log('토큰 만료 에러 >>> ' + response.error.msg + response.error.status);
          alert('로그인 시간이 만료되었습니다. 다시 로그인 해주세요.');
          localStorage.removeItem('x-auth-token');
          localStorage.removeItem('loginUser');
          this.router.navigate(['']);
          return Promise.reject('게시글 수정 중 오류 >>> ' + response.error.msg + '\n' + response.error.status);
        } else {
          alert('게시글 수정 도중 오류가 발생했습니다. 다시 시도해주세요.');
          return Promise.reject(response.error.msg);
        }
      });
  }

  // 게시글 삭제
  deletePost(postNo: number): Promise<boolean> {
    const deletePostUrl = this.getBoardUrl + '/post/' + postNo;
    return this.http.delete<ApiResponseSingle> (deletePostUrl)
      .toPromise()
      .then(this.apiValidationService.validateResponse)
      .then(response => {
        this.getPosts('free');
        return true;
      })
      .catch(response => {
        if (response.error.status === 403) {
          console.log('토큰 만료 에러 >>> ' + response.error.msg + response.error.status);
          alert('로그인 시간이 만료되었습니다. 다시 로그인 해주세요.');
          localStorage.removeItem('x-auth-token');
          localStorage.removeItem('loginUser');
          this.router.navigate(['']);
          return Promise.reject('게시글 삭제 중 오류 >>> ' + response.error.msg + '\n' + response.error.status);
        } else if (response.error.status === 404) {
          alert('타인의 글은 삭제할 수 없습니다.');
          return Promise.reject('타인 글 삭제 오류 >>> ' + response.error.msg + '\n' + response.error.status);
        } else {
          alert('게시글 삭제 오류가 발생했습니다.');
          return Promise.reject('게시글 삭제 중 오류 >>> ' + response.error.msg + '\n' + response.error.status);
        }
      });
  }
}

