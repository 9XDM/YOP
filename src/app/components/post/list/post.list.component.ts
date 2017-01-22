import {Component, OnInit} from "@angular/core";
import {Post} from "../../../model/post.model";
import {PostService} from "../../../service/post.service";
import {ActivatedRoute} from "@angular/router";
import {AuthService} from "../../../service/auth.service";
import {User} from "../../../model/user.model";


declare const $: any;

@Component({
  selector: 'post-component',
  providers: [PostService],
  templateUrl: 'post.list.component.html'
})


export class PostListComponent implements OnInit {
  posts: Post[];
  user: User;
  isLogin: boolean = false;
  isLiked: Boolean;

  constructor(private postService: PostService,
              private authService: AuthService,
              private activatedRouter: ActivatedRoute) {
  }

  ngOnInit() {
    this.activatedRouter.params
      .map(params => params['key'])
      .switchMap(key => this.postService.getPosts())
      .subscribe(posts => {
        this.posts = posts;
      });

    this.authService.getSession()
      .take(1)
      .subscribe(session => {
        if (session) {
          this.user = session.auth;
          this.isLogin = true;
        }

        // this.postService.isLiked(this.postKey, this.user).subscribe(isLiked => {
        //   this.isLiked = isLiked.$value
        // });
      });
  }

  onLikeBtnClick(postKey) {
    if (this.isLogin) {
      this.postService.toggleLike(postKey, this.user).then((data) =>{
        console.log(data)
      });
    } else {
      alert("로그인이 필요한 기능입니다.");
    }
  }
}
