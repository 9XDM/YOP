import {Component, OnInit} from "@angular/core";
import {Post} from "../../../model/post.model";
import {PostService} from "../../../service/post.service";
import {ActivatedRoute} from "@angular/router";


declare const $: any;

@Component({
  selector: 'post-component',
  providers: [PostService],
  templateUrl: 'post.list.component.html'
})


export class PostListComponent implements OnInit {
  posts: Post[];

  constructor(private postService: PostService,
              private activatedRouter: ActivatedRoute) {
  }

  ngOnInit() {
    this.activatedRouter.params
      .map(params => params['key'])
      .switchMap(key => this.postService.getPosts())
      .subscribe(posts => {
        this.posts = posts;
      });
  }

  // onLikeBtnClick(postKey) {
  //   this.postService.toggleLike(postKey, this.user);
  // }
}
