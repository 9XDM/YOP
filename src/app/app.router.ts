import {Routes} from "@angular/router";
import {PostDetailComponent} from "./components/post/detail/post.detail.component";
import {PostListComponent} from "./components/post/list/post.list.component";
import {PostWriteComponent} from "./components/post/write/post.write.component";

export const router: Routes = [
  {
    path:'', component: PostListComponent
  },
  {
    path:'post/:key', component: PostDetailComponent
  },
  {
    path:'write/:key', component: PostWriteComponent
  }
];
