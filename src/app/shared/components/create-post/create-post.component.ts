import { Component, ElementRef, inject, OnInit, signal, viewChild, WritableSignal } from '@angular/core';
import { initFlowbite, Modal } from 'flowbite';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { PostService } from '../s-post/services/post.service';

@Component({
  selector: 'app-create-post',
  imports: [ReactiveFormsModule],
  templateUrl: './create-post.component.html',
  styleUrl: './create-post.component.css'
})
export class CreatePostComponent implements OnInit{
  private readonly postService = inject(PostService);

  saveFile:WritableSignal<File | null> = signal(null);
  content:FormControl = new FormControl(null, [Validators.required]);
  myModal = viewChild<ElementRef>('postModal');

  ngOnInit(): void {
    initFlowbite();
  }
  changeImage(e:Event):void {
    let input = e.target as HTMLInputElement;
    if(input.files && (input.files.length > 0))
    {
      console.log(input.files[0]);
      this.saveFile.set(input.files[0]);
    }
  }

  submitForm(e:Event):void {
    e.preventDefault();
    if(this.content.valid){
      console.log(this.content.value);
      console.log(this.saveFile());

      const formData = new FormData();
      formData.append('body', this.content.value);
      let file = this.saveFile();
      if(file){
        formData.append('image', file, file.name);
      }
      // send form data to backend
      this.postService.createPost(formData).subscribe({
        next: (res)=> {
          console.log(res);
          if(res.message === 'success') {
            // close modal
            new Modal(this.myModal()?.nativeElement).hide();
            // get posts
          }
        },
        error: (err)=> {
          console.log(err);
        }
      })
    }
  }
}
