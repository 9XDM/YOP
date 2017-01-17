import {AngularFire, AuthProviders, AuthMethods, FirebaseAuthState, FirebaseListObservable} from "angularfire2";
import {Injectable} from "@angular/core";
import {BehaviorSubject, Observable} from "rxjs";

@Injectable()
export class PostService {
  constructor(private af: AngularFire) {
  }

  getPosts() {
    return this.af.database.list('/posts')
  }

  getPost(key) {
    return this.af.database.object('/posts/' + key)
  }
}
