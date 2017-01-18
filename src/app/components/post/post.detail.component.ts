import {Component, OnInit} from "@angular/core";
import {Route, Router, ActivatedRoute} from "@angular/router";
import {PostService} from "../../service/post.service";
import {FirebaseObjectObservable} from "angularfire2";
import {Post} from "../../model/post.model";

@Component({
  selector: 'post-detail-component',
  providers: [PostService],
  template: `
 <section class="intro detail">
            <h1>{{(post | async)?.title}}</h1>
            <h2>
                <img class="thumbnail circle responsive-img" src="http://cfile1.uf.tistory.com/image/273BA14B5830BF850BACD5"/>
                개발자 <a href="https://github.com/qkraudghgh">zineeworld</a>의 <span class="year">2016</span>년
                <span class="created">2017-01-14</span>
            </h2>
        </section>
        <section class="post-detail y-card">
            {{(post | async)?.body}}
        </section>
        <section class="post-info">
            <div class="like-container">
                <span class="custom-icon icon-heart2"></span>
                <span class="like-number">{{(post | async)?.starCount}}</span>
            </div>
            <a class="original-url" href="http://zinee-world.tistory.com/448">원문으로 읽기</a>
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
    })
  }
}
