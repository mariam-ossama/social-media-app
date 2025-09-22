import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { CreatePostComponent } from "../../shared/components/create-post/create-post.component";
import { SPostComponent } from "../../shared/components/s-post/s-post.component";
import { PostService } from '../../shared/components/s-post/services/post.service';
import { Post } from '../../shared/components/s-post/models/post.interface';

@Component({
  selector: 'app-timeline',
  imports: [CreatePostComponent, SPostComponent],
  templateUrl: './timeline.component.html',
  styleUrl: './timeline.component.css'
})
export class TimelineComponent implements OnInit{
  private readonly postService = inject(PostService);

  posts:WritableSignal<Post[]> = signal([]);

  ngOnInit(): void {
    this.getAllPosts();
  }
  getAllPosts():void {
    this.postService.getAllPosts().subscribe({
      next: (res)=> {
        console.log(res);
        this.posts.set(res.posts);
      },
      error: (err)=> {
        console.log(err);
      }
    })
  }
}
