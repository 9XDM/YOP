import {Component} from "@angular/core";
import {Post} from "../../model/post.model";
import {AngularFire, AuthMethods, AuthProviders} from "angularfire2";

@Component({
  selector: 'post-component',
  template: `
      <section class="posts">
            <ul class="row">
                <li class="post col s12 m6 l4"  *ngFor="let post of posts">
                    <a href="http://zinee-world.tistory.com/448">
                        <div class="user">
                            <img class="thumbnail circle responsive-img" src="http://cfile1.uf.tistory.com/image/273BA14B5830BF850BACD5"/>
                            <p>zineeworld</p>
                            <div class="like-container">
                                <span class="custom-icon icon-heart2"></span>
                                <span class="like-number">13</span>
                            </div>
                        </div>
                        <h3>2016 회고 + 블로그 결산</h3>
                        <div class="summary">V2를 릴리즈하고 여러 기능들이 추가되고 개선되면서 서비스를 만들어 가기에 매우 바빴던 한 해였다. 회사의 메인 서비스 웹/모바일 웹 마크업을 혼자서 전담해서</div>
                        <img class="thumbnail responsive-img" src="http://cfile30.uf.tistory.com/image/242BE13D587613BD236A4E"/>
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
  posts: Array<Post>;

  constructor(private af: AngularFire){
    this.posts = [];
    this.posts.push(new Post());
    this.posts.push(new Post());
    this.posts.push(new Post());
    this.posts.push(new Post());
  }
}
