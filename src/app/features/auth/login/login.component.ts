import { Component, inject, OnInit } from '@angular/core';
import { InputComponent } from "../../../shared/components/input/input.component";
import { UserService } from '../services/user.service';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Subscription } from 'rxjs/internal/Subscription';

@Component({
  selector: 'app-login',
  imports: [InputComponent, ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{
  private readonly userService = inject(UserService);
  private readonly fb = inject(FormBuilder);
  private readonly router = inject(Router);

  loginForm!:FormGroup;
  isLoading:boolean = false;
  subscription:Subscription = new Subscription();

  ngOnInit(): void {
    this.initForm();
  }
  initForm():void{
    this.loginForm = this.fb.group({
      email: [null,[Validators.required, Validators.email]],
      password: [null,[Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/)]],
    });
  }
  signin():void {
    console.log(this.loginForm.value);
    this.isLoading = true;
    this.subscription.unsubscribe();
    if(this.loginForm.valid){
      this.userService.signIn(this.loginForm.value).subscribe({
        next: (res)=> {
          console.log(res);
          if(res.message === 'success'){
            // save token in local storage
            localStorage.setItem('token',res.token);
            // remove loading
            this.isLoading = false
            // navigate to timeline page
            this.router.navigate(['/timeline']);
          }
        },
        error: (err)=> {
          console.log(err);
          this.isLoading = false;
        }
      })
    }else {
      this.loginForm.markAllAsTouched();
      this.isLoading = false
    }
  }
  get emailControl(): FormControl {
  return this.loginForm.get('email') as FormControl;
}
get passwordControl(): FormControl {
  return this.loginForm.get('password') as FormControl;
}

}
