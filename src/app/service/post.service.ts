import {AngularFire, AuthProviders, AuthMethods, FirebaseAuthState, FirebaseListObservable} from "angularfire2";
import {Injectable} from "@angular/core";
import {BehaviorSubject, Observable} from "rxjs";
import {Post} from "../model/post.model";

@Injectable()
export class PostService {
  private behaviorSubject: BehaviorSubject<Post[]> = new BehaviorSubject<Post[]>(null);

  constructor(private af: AngularFire) {
    this.af.database.list('/posts').subscribe(posts => {
      this.behaviorSubject.next(posts);
    });
  }

  getPosts() {
    return this.behaviorSubject.asObservable();
  }

  getPost(key) {
    return this.af.database.object('/posts/' + key)
  }
}
