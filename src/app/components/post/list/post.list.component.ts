import {Component} from "@angular/core";
import {Post} from "../../../model/post.model";
import {FirebaseListObservable} from "angularfire2";
import {PostService} from "../../../service/post.service";
import {Observable} from "rxjs";

@Component({
  selector: 'post-component',
  providers: [PostService],
  templateUrl: 'post.list.component.html'
})


export class PostListComponent {
  posts: Observable<Post[]>;

  constructor(private postService: PostService) {
    this.posts = postService.getPosts().distinctUntilChanged();
  }
}
