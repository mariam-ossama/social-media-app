import { Component, input, InputSignal, OnInit, WritableSignal } from '@angular/core';
import { initFlowbite } from 'flowbite';
import { Post } from './models/post.interface';
import { DatePipe } from '@angular/common';
import { SCommentComponent } from "../s-comment/s-comment.component";

@Component({
  selector: 'app-s-post',
  imports: [DatePipe, SCommentComponent],
  templateUrl: './s-post.component.html',
  styleUrl: './s-post.component.css'
})
export class SPostComponent implements OnInit{
  post:InputSignal<Post> = input.required()
  ngOnInit(): void {
      initFlowbite();
    }
}
