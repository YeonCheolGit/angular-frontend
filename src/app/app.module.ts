import { BrowserModule } from '@angular/platform-browser';
import { BoardResolve } from './component/board/resolve/resolve';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './modules/material/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HomeComponent } from './component/home.component';
import { SignInComponent } from './component/user/sign-in/sign-in.component';
import { SignUpComponent } from './component/user/sign-up/sign-up.component';
import { LogoutComponent } from './component/user/logout/logout.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { SignService } from './service/rest-api/sign/sign.service';
import { MyInfoComponent } from './component/user/myInfo/myInfo.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpRequestInterceptorService } from './service/rest-api/http-request-interceptor.service';
import {MyInfoService} from './service/rest-api/myInfo/myinfo.service';
import { BoardComponent } from './component/board/board.component';
import {BoardService} from './service/rest-api/board/board.service';
import { PostFormComponent } from './component/post/post-form.component';
import { SinglePostViewComponent } from './component/post/single-post-view/single-post-view.component';
import { SinglePostModifyComponent } from './component/board/modify/single-post-modify/single-post-modify.component';
import { SignUpKakaoComponent } from './component/user/sign-up-kakao/sign-up-kakao/sign-up-kakao.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SignInComponent,
    SignUpComponent,
    LogoutComponent,
    MyInfoComponent,
    BoardComponent,
    PostFormComponent,
    SinglePostViewComponent,
    SinglePostModifyComponent,
    SignUpKakaoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  exports: [
    ReactiveFormsModule
  ],
  providers: [
    SignService,
    MyInfoService,
    BoardService,
    BoardResolve,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpRequestInterceptorService,
      multi: true,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
