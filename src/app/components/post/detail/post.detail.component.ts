import {Component, OnInit} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
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

  isLiked: boolean;
  isAuth: boolean = false;
  postKey: String;
  commentBody: String;

  constructor(private router: ActivatedRoute,
              private postService: PostService,
              private authService: AuthService,
              private route: Router) {
  }

  ngOnInit() {
    this.router.params
      .map(params => params['key'])
      .subscribe(key => {
        this.postKey = key;
        this.post = this.postService.getPost(key);
        this.comments = this.postService.getComments(key);
      });

    this.authService.getSession()
      .take(1)
      .subscribe(session => {
        this.user = session.auth;
        this.postService.isLiked(this.postKey, this.user).subscribe(isLiked => {
          this.isLiked = isLiked.$value
        });

        this.post.subscribe(post => {
          $(".post-contents")[0].innerHTML = marked(post.body);

          if (post.uid === session.uid) {
            this.isAuth = true;
          }
        });
      });
  }

  onWriteBtnClick() {
    this.postService.writeComment(this.postKey, this.commentBody, this.user);
    $('.comment-text').val('');
  }

  onLikeBtnClick() {
    this.postService.toggleLike(this.postKey, this.user);
  }

  onDeleteBtnClick() {
    if (confirm("정말로 삭제 하시겠습니까?")) {
      this.postService.deletePost(this.postKey)
        .then(() => {
          alert('삭제가 완료 되었습니다.');
          this.route.navigate(['/']);
        })
        .catch(err => {
          alert('삭제에 실패 했습니다.');
        });
    }
  }
}
