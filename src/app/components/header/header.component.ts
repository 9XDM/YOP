import {Component, OnInit} from "@angular/core";
import {FirebaseAuthState} from "angularfire2";
import {AuthService} from "../../service/auth.service";
import {Router} from "@angular/router";

declare const $: any;

@Component({
  selector: 'header-component',
  providers: [AuthService],
  styleUrls: ['header.component.css'],
  templateUrl: 'header.component.html'

})

export class HeaderComponent implements OnInit{
  user: firebase.User;
  isLoggedIn = false;

  constructor(private authService: AuthService, private router: Router) {
    authService.loginStateChange()
      .filter(authState => {
        this.isLoggedIn = false;
        return authState !== null
      })
      .map(authState => authState.auth)
      .subscribe(user => {
        this.user = user;
        this.isLoggedIn = true;
      });
  }

  ngOnInit() {
    $(".button-collapse").sideNav();
  }

  onLoginButtonClick() {
    this.authService.loginWithGithub()
  }

  onLogoutButtonClick() {
    const response = confirm("정말로 로그아웃 하시겠습니까?");
    if (response == true) {
      this.authService.logout();
    }
  }

  onWritePostClick() {
    this.authService.getSession()
      .take(1)
      .subscribe(session => {
        if (session) {
          this.router.navigate(['/posts/write/new']);
        } else {
          alert('로그인 해주세요.');
        }
      });
  }

}
