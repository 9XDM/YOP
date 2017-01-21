import {AngularFire, AuthProviders, AuthMethods, FirebaseAuthState, FirebaseListObservable} from "angularfire2";
import {Injectable} from "@angular/core";
import {BehaviorSubject, Observable} from "rxjs";
import {Post} from "../model/post.model";
import {User} from "../model/user.model";

declare namespace firebase.database.ServerValue {
  const TIMESTAMP: any
}

declare namespace firebase.database.Reference {
    const transaction;
}

@Injectable()
export class PostService {
  private behaviorSubject: BehaviorSubject<Post[]> = new BehaviorSubject<Post[]>(null);

  constructor(private af: AngularFire) {
    this.af.database.list('/posts', {
      query: { // does not work
        limitToFirst: 9,
      }
    }).subscribe(posts => {
      this.behaviorSubject.next(posts);
    });
  }

  getPosts() {
    return this.behaviorSubject.asObservable();
  }

  getPost(postKey) {
    return this.af.database.object(`/posts/${postKey}`)
  }

  getComments(postKey) {
    return this.af.database.list(`/post-comments/${postKey}`)
  }

  isLiked(postKey, user: User) {
    return this.af.database.object('/posts/' + postKey + '/stars/' + user.uid)
  }

  writeComment(postKey, text, user: User) {
    return this.af.database.list(`/post-comments/${postKey}`).push({
      author: user.displayName,
      authorPic: user.photoURL,
      text: text,
      uid: user.uid,
      createDate: firebase.database.ServerValue.TIMESTAMP,
    })
  }

  toggleLike(postKey, isLiked, user: User) {
    return this.af.database.object('/posts/' + postKey + '/stars/' + user.uid).set(isLiked)
  }

  writePost(title, body, user: User) {
    return this.af.database.list('/posts/').push({
      author: user.displayName,
      authorPic: user.photoURL,
      uid: user.uid,
      createDate: firebase.database.ServerValue.TIMESTAMP,
      starCount: 0,
      title,
      body
    })
  }

  modifyPost(postKey, title, body) {
    return this.af.database.object(`/posts/${postKey}`).update({
      title,
      body
    })
  }
}
