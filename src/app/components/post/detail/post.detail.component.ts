import {Component, OnInit} from "@angular/core";
import {Route, Router, ActivatedRoute} from "@angular/router";
import {PostService} from "../../../service/post.service";
import {FirebaseObjectObservable} from "angularfire2";
import {Post} from "../../../model/post.model";
import {AuthService} from "../../../service/auth.service";
import {User} from "../../../model/user.model";

declare const $: any;
declare const marked: any;

@Component({
  selector: 'post-detail-component',
  providers: [PostService],
  templateUrl: 'post.detail.component.html',

})

export class PostDetailComponent implements OnInit {
  post: FirebaseObjectObservable<Post>;
  user: User;

  constructor(private router: ActivatedRoute, private postService: PostService, private authService: AuthService) {
  }

  ngOnInit() {
    this.router.params.subscribe(params => {
      this.post = this.postService.getPost(params['key'])
    });

    this.post.subscribe(post => {
      $(".post-detail")[0].innerHTML = marked(post.body);
    });

    this.authService.getSession()
      .take(1)
      .subscribe(session => {
        this.user = session.auth;
      });
  }
}
