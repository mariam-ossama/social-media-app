import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private readonly http = inject(HttpClient);

  createPost(data:object):Observable<any> {
    return this.http.post(environment.baseUrl + `posts`,
      data
    );
  }
  getAllPosts():Observable<any> {
    return this.http.get(environment.baseUrl + `posts?limit=50`);
  }
  getUserPosts(id:string):Observable<any> {
    return this.http.get(environment.baseUrl + `users/${id}/posts?limit=2`,);
  }
  getSinglePost(postId:string):Observable<any> {
    return this.http.get(environment.baseUrl + `posts/${postId}`);
  }
  updatePost(data:object, postId:string):Observable<any> {
    return this.http.put(environment.baseUrl + `posts/${postId}`,
      data
    );
  }
  deletePost(postId:string):Observable<any> {
    return this.http.delete(environment.baseUrl + `posts/${postId}`);
  }
}
