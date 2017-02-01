import {Injectable}     from '@angular/core';
import {CanActivate, Router}    from '@angular/router';
import {AuthService} from "./auth.service";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate() {
    return this.authService.getSession()
      .map(session => this.checkSession(session));
  }

  checkSession(session): boolean {
    if (!session) {
      alert('로그인이 필요한 서비스입니다.');
      this.router.navigate(['/posts']);

      return false;
    } else {
      return true;
    }
  }
}
