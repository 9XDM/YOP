import {Component, OnInit} from "@angular/core";
import {Route, Router, ActivatedRoute} from "@angular/router";
import {PostService} from "../../../service/post.service";
import {FirebaseObjectObservable} from "angularfire2";
import {Post} from "../../../model/post.model";
import {AuthService} from "../../../service/auth.service";
import {User} from "../../../model/user.model";
import {ImageResult, ResizeOptions} from "ng2-imageupload";
import * as firebase from 'firebase';
import {Github} from "../../../constant";
import {Http} from "@angular/http";

firebase.initializeApp({
  apiKey: "AIzaSyDRWInNTqMZMkbbFxeJfbjHN3dwSZLJbKI",
  authDomain: "yopyop-5e569.firebaseapp.com",
  databaseURL: "https://yopyop-5e569.firebaseio.com",
  storageBucket: "yopyop-5e569.appspot.com",
  messagingSenderId: "798678080282"
});

declare const $: any;
declare const SimpleMDE: any;
const storageRef = firebase.storage().ref();

@Component({
  selector: 'post-write-component',
  providers: [PostService],
  templateUrl: 'post.write.component.html',
})

export class PostWriteComponent implements OnInit {
  postObservable: FirebaseObjectObservable<Post>;
  user: User;
  postKey: String;
  imageSrc: string = "";

  title: String;
  body: String;
  simpleMde: any;
  originalURL: String = "";
  isModified: boolean = false;

  constructor(private activatedRouter: ActivatedRoute,
              private postService: PostService,
              private authService: AuthService,
              private http: Http,
              private route: Router) {
  }

  ngOnInit() {
    this.simpleMde = new SimpleMDE({
      element: $("#writePost")[0],
      spellChecker: false
    });

    this.activatedRouter.params
      .map(params => params['key'])
      .filter(key => key !== 'new')
      .switchMap(key => {
        this.postKey = key;
        this.isModified = true;
        return this.postService.getPost(key)
      })
      .subscribe(post => {
        this.title = post.title;
        this.body = post.body;
        this.originalURL = post.originalURL;
        this.imageSrc = post.imageURL;
        if (this.imageSrc) {
          $('input.file-path').val('등록된 썸네일이 있습니다.');
        }

        this.simpleMde.value(this.body);
      });

    this.authService.getSession()
      .take(1)
      .subscribe(session => {
        this.user = session.auth

        this.http.get(`${Github.API_USER}/${session.auth.providerData[0].uid}`).subscribe(res => {
          this.user.githubURL = res.json().html_url; // hard coding.. for getting githubURL
        })
      });
  }

  onWriteBtnClick() {
    if (!this.title || !this.simpleMde.value()) {
      alert('제목과 내용을 입력해주세요.');
    } else {
      $('.submit').val('올리는중').addClass('disabled');
    }
    this.postService.writePost(this.title, this.simpleMde.value(), this.originalURL, this.imageSrc, this.user)
      .then(() => {
        alert('회고 작성이 완료 되었습니다.');
        this.route.navigate(['/']);
      });
  }

  onModifyBtnClick() {
    if (!this.title || !this.simpleMde.value()) {
      alert('제목과 내용을 입력해주세요.');
    } else {
      $('.submit').val('올리는중').addClass('disabled');
    }
    this.postService.modifyPost(this.postKey, this.title, this.simpleMde.value(), this.imageSrc, this.originalURL)
      .then(() => {
        alert('회고 수정이 완료 되었습니다.');
        this.route.navigate(['/']);
      });
  }

  selected(imageResult: ImageResult) {
    let uploadTask = storageRef.child(imageResult.file.name + new Date().getMilliseconds()).put(imageResult.file);
    $('.submit').val('올리는중').addClass('disabled');

    uploadTask.on('state_changed', (snapshot) => {
      // Observe state change events such as progress, pause, and resume
      // See below for more detail
    }, (error) => {
      alert(error);
      $('.submit').val('올리기').removeClass('disabled');
    }, () => {
      this.imageSrc = uploadTask.snapshot.downloadURL;
      $('.submit').val('올리기').removeClass('disabled');
      alert('이미지 업로드에 성공 했습니다.');
    });
  }
}
