import {AngularFire, AuthProviders, AuthMethods, FirebaseAuthState, FirebaseListObservable} from "angularfire2";
import {Injectable} from "@angular/core";
import {BehaviorSubject, Observable} from "rxjs";
import {Post} from "../model/post.model";
import {User} from "../model/user.model";

declare namespace firebase.database.ServerValue {
  const TIMESTAMP: any
}

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

  getPost(postKey) {
    return this.af.database.object('/posts/' + postKey)
  }

  getComments(postKey) {
    return this.af.database.list('/post-comments/' + postKey)
  }

  writeComment(postKey, text, user:User) {
    return this.af.database.list('/post-comments/' + postKey).push({
      author: user.displayName,
      authorPic: user.photoURL,
      text: text,
      uid: user.uid,
      createDate: firebase.database.ServerValue.TIMESTAMP,
    })
  }
}
