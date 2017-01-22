import {AngularFire} from "angularfire2";
import {Injectable} from "@angular/core";
import {BehaviorSubject, Observable} from "rxjs";
import {Post} from "../model/post.model";
import {User} from "../model/user.model";
import * as firebase from 'firebase';

@Injectable()
export class PostService {
  private behaviorSubject: BehaviorSubject<Post[]> = new BehaviorSubject<Post[]>(null);

  constructor(private af: AngularFire) {
    this.af.database.list('/posts', {
      query: {
        orderByChild: 'createDate'
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
    return this.af.database.object(`/posts/${postKey}/likes/${user.uid}`)
  }

  writeComment(postKey, text, user: User) {
    return this.af.database.list(`/post-comments/${postKey}`).push({
      author: user.displayName,
      authorPic: user.photoURL,
      text: text,
      uid: user.uid,
      createDate: firebase.database.ServerValue.TIMESTAMP,
    });
  }

  toggleLike(postKey, user: User) {
    return firebase.database().ref(`/posts/${postKey}/likes`).transaction((likes) => {
      if (likes && likes[user.uid]) {
        firebase.database().ref(`/posts/${postKey}/likeCount`).transaction((likeCount) => {
          return --likeCount;
        });
        likes[user.uid] = null;
      } else {
        if (!likes) {
          likes = {};
        }
        firebase.database().ref(`/posts/${postKey}/likeCount`).transaction((likeCount) => {
          return ++likeCount;
        });
        likes[user.uid] = true;
      }
      return likes
    });
  }

  writePost(title, body, originalURL, user: User) {
    return this.af.database.list('/posts/').push({
      author: user.displayName,
      authorPic: user.photoURL,
      uid: user.uid,
      createDate: firebase.database.ServerValue.TIMESTAMP,
      likeCount: 0,
      title,
      body,
      originalURL
    })
  }

  modifyPost(postKey, title, body, originalURL) {
    return this.af.database.object(`/posts/${postKey}`).update({
      title,
      body,
      originalURL
    })
  }
}
