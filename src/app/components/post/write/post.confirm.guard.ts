import {CanDeactivate} from '@angular/router';
import {Injectable} from "@angular/core";
import {PostWriteComponent} from "./post.write.component";

@Injectable()
export class PostConfirmGuard implements CanDeactivate<PostWriteComponent> {
  // PostWriteComponent의 데이터를 활용하여 분기하는 코드가 추가될 수 있음.
  canDeactivate(component: PostWriteComponent): Promise<boolean> | boolean {
    return window.confirm("글 작성이 완료되지 않았습니다. 페이지를 이동하시겠습니까?")
  }
}
