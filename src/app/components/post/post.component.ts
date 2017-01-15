import {Component} from "@angular/core";
import {Post} from "../../model/post.model";
import {AngularFire, AuthMethods, AuthProviders, FirebaseListObservable} from "angularfire2";
import {PostService} from "../../service/post.service";

@Component({
  selector: 'post-component',
  providers: [PostService],
  template: `
      <section class="posts">
            <ul class="row">
                <li class="post col s12 m6 l4"  *ngFor="let post of posts | async">
                    <a href="http://zinee-world.tistory.com/448">
                        <div class="user">
                            <img class="thumbnail circle responsive-img" src="http://cfile1.uf.tistory.com/image/273BA14B5830BF850BACD5"/>
                            <p>{{post.author}}</p>
                            <div class="like-container">
                                <span class="custom-icon icon-heart2"></span>
                                <span class="like-number">{{post.starCount}}</span>
                            </div>
                        </div>
                        <h3>{{post.title}}</h3>
                        <div class="summary">{{post.body}}</div>
                        <img class="thumbnail responsive-img" [src]="post.authorPic"/>
                        <div class="divider"></div>
                        <div class="date-container">
                            <span class="year">2016</span>
                            <span class="created">2017-01-14</span>
                        </div>
                    </a>
                </li>
            </ul>
        </section>
`
})


export class PostComponent {
  posts: FirebaseListObservable<Post[]>;

  constructor(private postService: PostService){
    this.posts = postService.getPosts();
  }
}
