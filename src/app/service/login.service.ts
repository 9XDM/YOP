import {AngularFire, AuthProviders, AuthMethods, FirebaseAuthState} from "angularfire2";
import {Injectable} from "@angular/core";
import {BehaviorSubject, Observable} from "rxjs";

@Injectable()
export class LoginService {
  private behaviorSubject: BehaviorSubject<firebase.User> = new BehaviorSubject<firebase.User>(null);

  constructor(private af: AngularFire) {
    this.af.auth.subscribe(authState => {
      this.behaviorSubject.next(authState.auth)
    });
  }

  loginStateChange(): Observable<firebase.User>{
    return this.behaviorSubject.asObservable()
  }

  loginWithGithub() {
    this.af.auth.login({
      provider: AuthProviders.Github,
      method: AuthMethods.Popup,
    });
  }

  logout() {
    this.af.auth.logout();
  }
}
