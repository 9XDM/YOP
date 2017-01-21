import {Component, OnInit} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {PostService} from "../../../service/post.service";
import {FirebaseObjectObservable, FirebaseListObservable} from "angularfire2";
import {Comment} from "../../../model/comment.model";
import {Post} from "../../../model/post.model";
import {User} from "../../../model/user.model";
import {AuthService} from "../../../service/auth.service";

declare const $: any;
declare const marked: any;

@Component({
  selector: 'post-detail-component',
  providers: [PostService],
  templateUrl: 'post.detail.component.html',

})

export class PostDetailComponent implements OnInit {
  post: FirebaseObjectObservable<Post>;
  comments: FirebaseListObservable<Comment[]>;
  user: User;

  isStared: Number;
  postKey: String;
  commentBody: String;

  constructor(private router: ActivatedRoute,
              private postService: PostService,
              private authService: AuthService) {
  }

  ngOnInit() {
    this.router.params.subscribe(params => {
      this.postKey = params['key'];
      this.post = this.postService.getPost(params['key']);
      this.comments = this.postService.getComments(params['key'])
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

  onWriteBtnClick() {
    this.postService.writeComment(this.postKey, this.commentBody, this.user);
  }

  /*onLikeBtnClick() {
    this.postService.toggleLike(this.postKey, this.user);
  }*/
}
