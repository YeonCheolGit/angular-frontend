import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './component/home.component';
import {SignInComponent} from './component/user/sign-in/sign-in.component';
import {SignUpComponent} from './component/user/sign-up/sign-up.component';
import {LogoutComponent} from './component/user/logout/logout.component';
import {MyInfoComponent} from './component/user/myInfo/myInfo.component';
import {AuthGuard} from './guards/auth.guard';
import {BoardComponent} from './component/board/board.component';
import {PostFormComponent} from './component/post/post-form.component';
import {SinglePostViewComponent} from './component/post/single-post-view/single-post-view.component';
import {SinglePostModifyComponent} from './component/board/modify/single-post-modify/single-post-modify.component';
import {BoardResolve} from './component/board/resolve/resolve';
import {SignUpKakaoComponent} from './component/user/sign-up-kakao/sign-up-kakao/sign-up-kakao.component';


const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'signIn', component: SignInComponent},
  {path: 'signUp', component: SignUpComponent},
  {path: 'signUpKakaoButton', component: SignInComponent},
  {path: 'logOut', component: LogoutComponent},
  {path: 'myInfo', component: MyInfoComponent, canActivate: [AuthGuard]},
  {path: 'board/:boardName', component: BoardComponent, resolve: {posts: BoardResolve}},
  {path: 'board/:boardName/post', component: PostFormComponent, canActivate: [AuthGuard]},
  {path: 'board/:boardName/post/:postNo', component: SinglePostViewComponent},
  {path: 'board/:boardName/post/:postNo/modify', component: SinglePostModifyComponent, canActivate: [AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
