import {Component, OnInit} from "@angular/core";
import {Route, Router, ActivatedRoute} from "@angular/router";
import {PostService} from "../../service/post.service";
import {FirebaseObjectObservable} from "angularfire2";
import {Post} from "../../model/post.model";

declare const $: any;
declare const marked: any;

@Component({
  selector: 'post-detail-component',
  providers: [PostService],
  template: `
 <section class="intro detail">
            <h1>{{(post | async)?.title}}</h1>
            <h2>
                <img class="thumbnail circle responsive-img" src="{{(post | async)?.authorPic}}"/>
                개발자 <a href="https://github.com/qkraudghgh">{{(post | async)?.author}}</a>의 <span class="year">{{(post | async)?.year}}</span>년
                <span class="created">2017-01-14</span>
            </h2>
        </section>
        <section class="post-detail y-card">
        </section>
        <section class="post-info">
            <div class="like-container">
                <span class="custom-icon icon-heart2"></span>
                <span class="like-number">{{(post | async)?.starCount}}</span>
            </div>
            <a class="original-url" href="{{(post | async)?.original_url}}">원문으로 읽기</a>
            <div class="share-container">
                <span class="icon-facebook"></span>
                <span class="icon-twitter"></span>

            </div>
        </section>
`,

})

export class PostDetailComponent implements OnInit {
  post: FirebaseObjectObservable<Post>;

  constructor(private router: ActivatedRoute, private postService: PostService) {
  }

  ngOnInit() {
    this.router.params.subscribe(params => {
      this.post = this.postService.getPost(params['key'])
    });

    this.post.subscribe(post => {
      $(".post-detail")[0].innerHTML = marked(post.body);
    })
  }
}
