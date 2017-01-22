import {Component, OnInit} from "@angular/core";
import {Route, Router, ActivatedRoute} from "@angular/router";
import {PostService} from "../../../service/post.service";
import {FirebaseObjectObservable} from "angularfire2";
import {Post} from "../../../model/post.model";
import {AuthService} from "../../../service/auth.service";
import {User} from "../../../model/user.model";

declare const $: any;
declare const SimpleMDE: any;

@Component({
  selector: 'post-write-component',
  providers: [PostService],
  templateUrl: 'post.write.component.html',
})

export class PostWriteComponent implements OnInit {
  postObservable: FirebaseObjectObservable<Post>;
  user: User;
  postKey: String;

  title: String;
  body: String;
  simpleMde: any;
  originalURL: String;
  isModified: boolean = false;

  constructor(private activatedRouter: ActivatedRoute,
              private postService: PostService,
              private authService: AuthService,
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

        this.simpleMde.value(this.body);
      });

    this.authService.getSession()
      .take(1)
      .subscribe(session => {
        this.user = session.auth;
      });
  }

  onWriteBtnClick() {
    this.postService.writePost(this.title, this.simpleMde.value(), this.originalURL, this.user)
      .then(() => {
        alert('회고 작성이 완료 되었습니다.');
        this.route.navigate(['/']);
      });
  }

  onModifyBtnClick() {
    this.postService.modifyPost(this.postKey, this.title, this.simpleMde.value(), this.originalURL)
      .then(() => {
        alert('회고 수정이 완료 되었습니다.');
        this.route.navigate(['/']);
      });
  }
}
