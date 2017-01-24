import {Component, OnInit} from "@angular/core";
import {ActivatedRoute, Router, NavigationEnd} from "@angular/router";
import {PostService} from "../../../service/post.service";
import {FirebaseObjectObservable, FirebaseListObservable, AngularFire} from "angularfire2";
import {Comment} from "../../../model/comment.model";
import {Post} from "../../../model/post.model";
import {User} from "../../../model/user.model";
import {AuthService} from "../../../service/auth.service";
import {Observable} from "rxjs";

declare const $: any;
declare const marked: any;

const size = 'width=626 height=436';

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
  isLogin: boolean = false;
  postKey: String;
  commentBody: String;
  imageURL: String;
  title: string;
  body: string;

  nextPostObservable: Observable<any>;
  prevPostObservable: Observable<any>;

  constructor(private router: ActivatedRoute,
              private postService: PostService,
              private authService: AuthService,
              private route: Router) {
    route.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.post.subscribe(post => {
          window.scrollTo(0, 0);
          if (event.urlAfterRedirects.match(/\/posts\/-/)) {
            $('.post-contents')[0].innerHTML = marked(post.body);
            this.imageURL = post.imageURL;
            this.title = post.title;
            this.body = post.body;
          }
          if (this.user) {
            this.isAuth = post.uid === this.user.uid;
          }
        })
      }
    })
  }

  ngOnInit() {
    this.router.params
      .map(params => params['key'])
      .subscribe(key => {
        this.postKey = key;
        this.post = this.postService.getPost(key);
        this.comments = this.postService.getComments(key);
        this.nextPostObservable = this.postService.getNextPost(this.postKey);
        this.prevPostObservable = this.postService.getPrevPost(this.postKey);
      });

    this.authService.getSession()
      .take(1)
      .subscribe(session => {
        if (session) {
          this.user = session.auth;
          this.isLogin = true;

          this.postService.isLiked(this.postKey, this.user).subscribe(isLiked => {
            this.isLiked = isLiked.$value
          });
        }
      });
  }

  onWriteBtnClick() {
    this.postService.writeComment(this.postKey, this.commentBody, this.user).then(() => {
      this.commentBody = null;
    });
  }

  onLikeBtnClick() {
    if (this.isLogin) {
      this.postService.toggleLike(this.postKey, this.user);
      return;
    } else {
      alert("로그인이 필요한 기능입니다.");
    }
  }

  loginRequiredClick() {
    if (confirm("로그인 하시겠습니까?")) {
      this.authService.loginWithGithub();
    } else {
      return;
    }
  }

  onDeleteBtnClick() {
    if (confirm("정말로 삭제 하시겠습니까?")) {
      this.postService.deletePost(this.postKey)
        .then(() => {
          alert('삭제가 완료 되었습니다.');
          location.replace('/');
        })
        .catch(err => {
          alert('삭제에 실패 했습니다.');
        });
    }
  }

  onNextPostBtnClick() {
    this.nextPostObservable.subscribe(nextPost => {
      this.route.navigate([`/posts/${nextPost.$key}`])
    })
  }

  onPrevPostBtnClick() {
    this.prevPostObservable.subscribe(prevPost => {
      this.route.navigate([`/posts/${prevPost.$key}`])
    })
  }

  onShareInFacebook() {
    let url = location.href;
    let image = this.imageURL || 'https://yop.cool/assets/img/share.png';
    window.open(`https://www.facebook.com/v2.1/dialog/feed?&app_id=1404961129515494&caption=YOP: Year Of Programmers&description=${encodeURIComponent(this.body)}&display=popup&locale=ko_KR&name=${encodeURIComponent(this.title)}&link=${encodeURIComponent(url)}&picture=${image}&version=v2.1`,
      'facebookShare',
      'toolbar=0,status=0,width=625,height=435'
    );
  }

  onShareInTwitter() {
    let url = location.href;
    window.open(`https://twitter.com/share?url=${url}`, '_blank', size);
  }
}
