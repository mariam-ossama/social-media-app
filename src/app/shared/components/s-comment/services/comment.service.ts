import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  private readonly http = inject(HttpClient);

  createComment(data:object):Observable<any>{
    return this.http.post(environment.baseUrl + `comments`,
      data
    );
  }
  getPostComment(postId:string):Observable<any>{
    return this.http.get(environment.baseUrl + `posts/${postId}/comments`)
  }
  updateComment(data:object, commentId:string):Observable<any>{
    return this.http.put(environment.baseUrl + `comments/${commentId}`,
      data
    );
  }
  deleteComment(commentId:string):Observable<any>{
    return this.http.delete(environment.baseUrl + `comments/${commentId}`);
  }
}
