import {Component} from "@angular/core";
import {Post} from "../../../model/post.model";
import {PostService} from "../../../service/post.service";


declare const $: any;

@Component({
  selector: 'post-component',
  providers: [PostService],
  templateUrl: 'post.list.component.html'
})


export class PostListComponent {
  posts: Post[];

  constructor(private postService: PostService) {
    postService.getPosts().subscribe(posts => {
      this.posts = posts;
    });
  }
}
