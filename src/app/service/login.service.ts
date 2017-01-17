import {AngularFire, AuthProviders, AuthMethods, FirebaseAuthState} from "angularfire2";
import {Injectable} from "@angular/core";
import {BehaviorSubject, Observable} from "rxjs";

@Injectable()
export class LoginService {
  private behaviorSubject: BehaviorSubject<FirebaseAuthState> = new BehaviorSubject<FirebaseAuthState>(null);

  constructor(private af: AngularFire) {
    this.af.auth.subscribe(authState => {
      this.behaviorSubject.next(authState)
    });
  }

  loginStateChange(): Observable<FirebaseAuthState>{
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
