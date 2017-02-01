import {Routes} from "@angular/router";
import {PostDetailComponent} from "./components/post/detail/post.detail.component";
import {PostListComponent} from "./components/post/list/post.list.component";
import {PostWriteComponent} from "./components/post/write/post.write.component";
import {AuthGuard} from "./service/auth.guard";
import {PostConfirmGuard} from "./components/post/write/post.confirm.guard";

export const router: Routes = [
  {
    path: '', redirectTo: '/posts', pathMatch: 'full'
  },
  {
    path:'posts', component: PostListComponent
  },
  {
    path:'posts/my', component: PostListComponent
  },
  {
    path:'posts/:key', component: PostDetailComponent
  },
  {
    path:'posts/write/:key',
    component: PostWriteComponent,
    canActivate: [AuthGuard],
    canDeactivate: [PostConfirmGuard]
  }
];
