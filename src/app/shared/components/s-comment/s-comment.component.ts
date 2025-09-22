import { Component, input, InputSignal, OnInit } from '@angular/core';
import { Comment } from '../s-post/models/post.interface';
import { DatePipe } from '@angular/common';
import { initFlowbite } from 'flowbite';

@Component({
  selector: 'app-s-comment',
  imports: [DatePipe],
  templateUrl: './s-comment.component.html',
  styleUrl: './s-comment.component.css'
})
export class SCommentComponent implements OnInit{
  comment:InputSignal<Comment> = input.required();

  ngOnInit(): void {
        initFlowbite();
      }
}
