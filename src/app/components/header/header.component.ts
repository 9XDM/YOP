import {Component, AfterViewInit, AfterContentInit} from "@angular/core";
import {LoginService} from "../../service/login.service";
import {User} from "../../model/user.model";
import {FirebaseAuthState} from "angularfire2";
@Component({
  selector: 'header-component',
  providers: [LoginService],
  styles: [`
#user-info, #sign-in-button {
  display: none;
}
#sign-in-button.activate {
  display: block;
}
#user-info.activate{
  display: block;
}
`],
  template: `<header>
  <ul id="account-dropdown" class="dropdown-content">
    <li><a id="sign-in-text" href="#">Signed as {{user?.displayName}}</a></li>
    <li class="divider"></li>
    <li id="menu-my-posts"><a href="#!">내가 쓴 회고</a></li>
    <li id="menu-my-like-posts"><a href="#!">내가 좋아한 회고</a></li>
    <li class="divider"></li>
    <li id="sign-out-button"><a href="#">로그아웃</a></li>
  </ul>
  <div class="navbar-fixed">
    <nav class="nav-main" role="navigation">
      <div class="nav-wrapper container">
        <a id="logo-container" href="#" class="brand-logo">
          <img src="./assets/img/logo.svg" alt="YOP Logo">
        </a>
        <ul id="nav-top" class="right account-large">
          <li id="sign-in-button" class="login hide-on-med-and-down" (click)="onLoginButtonClick()" [class.activate]="!isLoggedIn">
            <a href="#">Login with <span class="custom-icon icon-github-alt"></span></a>
          </li>
          <li id="user-info" class="user-info hide-on-med-and-down" [class.activate]="isLoggedIn">
            <a class="dropdown-button" href="#!" data-activates="account-dropdown">
              <img id="profile-image" class="circle responsive-img" [src]="user?.photoURL"/>
              <span id="profile-name">{{user?.displayName}}</span>
              <i class="material-icons right">arrow_drop_down</i>
            </a>
          </li>
          <li class="write">
            <a id="add" class="write-container" href="#">
              <span class="icon-quill"></span>
            </a>
          </li>
        </ul>
        <ul id="slide-out" class="side-nav">
          <li>
            <div class="userView">
              <div class="background" style="background: #ffbb57"></div>
              <a href="#!user"><img class="circle" [src]="user?.photoURL"></a>
              <a href="#!name"><span class="white-text name">{{user?.displayName}}</span></a>
              <a href="#!email"><span class="white-text email">{{user?.email}}</span></a>
            </div>
          </li>
          <li><a href="#">Login with <span class="custom-icon icon-github-alt"></span></a></li>
          <li><a href="#!">내가 쓴 회고</a></li>
          <li><a href="#!">내가 좋아한 회고</a></li>
          <li>
            <div class="divider"></div>
          </li>
          <li><a class="waves-effect" href="#!">Logout</a></li>
        </ul>
        <a href="#" data-activates="slide-out" class="menu button-collapse"><span class="icon-th-menu"></span></a>
      </div>
    </nav>
  </div>
</header>
`

})

export class HeaderComponent {
  user: firebase.User;
  isLoggedIn = false;

  constructor(private loginService: LoginService) {
    loginService.loginStateChange()
      .filter(it => {
        return it !== null;
      })
      .map((it: FirebaseAuthState) => {
        return it.auth
      })
      .take(1)
      .subscribe(user => {
        this.user = user;
        this.isLoggedIn = true;
      });
  }

  onLoginButtonClick() {
    this.loginService.loginWithGithub()
  }

}
