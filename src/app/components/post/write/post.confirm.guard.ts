import {CanDeactivate} from '@angular/router';
import {Injectable} from "@angular/core";
import {PostWriteComponent} from "./post.write.component";

@Injectable()
export class PostConfirmGuard implements CanDeactivate<PostWriteComponent> {
  canDeactivate(component: PostWriteComponent): Promise<boolean> | boolean {
    if (component.simpleMde.value() === '') {
      return true;
    }
    return window.confirm("내용이 저장되지 않았습니다. 페이지를 이동하시겠습니까?")
  }
}
