import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './component/home.component';
import {SignInComponent} from './component/user/sign-in/sign-in.component';
import {SignUpComponent} from './component/user/sign-up/sign-up.component';
import {LogoutComponent} from './component/user/logout/logout.component';
import {MyInfoComponent} from './component/user/myInfo/myInfo.component';
import {AuthGuard} from './guards/auth.guard';
import {BoardComponent} from './component/board/board.component';
import {PostComponent} from './component/post/post.component';


const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'signIn', component: SignInComponent},
  {path: 'signUp', component: SignUpComponent},
  {path: 'logOut', component: LogoutComponent},
  {path: 'myInfo', component: MyInfoComponent, canActivate: [AuthGuard]},
  {path: 'board/:boardName', component: BoardComponent},
  {path: 'board/:boardName/post', component: PostComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
