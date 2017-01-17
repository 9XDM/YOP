import {Routes} from "@angular/router";
import {PostComponent} from "./components/post/posts.component";
import {PostDetailComponent} from "./components/post/post.detail.component";

export const router: Routes = [
  {
    path:'', component: PostComponent
  },
  {
    path:'post/:key', component: PostDetailComponent
  }
];
