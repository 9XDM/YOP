import {Pipe, PipeTransform} from '@angular/core';
import {Post} from "../../../model/post.model";
import {User} from "../../../model/user.model";

@Pipe({
  name: 'isLiked'
})
export class IsLikedPipe implements PipeTransform{
  transform(post: Post, user: User) {
    if(post.likes !== undefined && user){
      try{
        return post.likes.hasOwnProperty(user.uid);
      }catch(e){
        console.log(e)
      }
    }
  }
}
