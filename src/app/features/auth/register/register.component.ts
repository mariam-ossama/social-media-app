import { Component, inject, OnInit } from '@angular/core';
import { InputComponent } from "../../../shared/components/input/input.component";
import { UserService } from '../services/user.service';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-register',
  imports: [InputComponent, ReactiveFormsModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit{
  private readonly userService = inject(UserService);
  private readonly fb = inject(FormBuilder);
  private readonly router = inject(Router);

  registerForm!:FormGroup;
  isLoading:boolean = false;
  subscription:Subscription = new Subscription();

  ngOnInit(): void {
    this.initForm();
  }
  initForm():void{
    this.registerForm = this.fb.group({
      name: [null,[Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      email: [null,[Validators.required, Validators.email]],
      password: [null,[Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/)]],
      rePassword: [null,[Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/)]], // password match
      dateOfBirth: [null,[Validators.required, Validators.pattern(/^\d{2}-\d{2}-\d{4}$/)]], //mm-dd-yyyy
      gender: [null,[Validators.required, Validators.pattern(/^[(male)(female)]$/)]] // male | female only
    }, 
    {validators: [this.confirmPasswordValidator()]});
  }
  signUp():void {
    this.isLoading = true;
    this.subscription.unsubscribe();
    if(this.registerForm.valid){
      this.userService.signUp(this.registerForm.value).subscribe({
        next: (res)=> {
          console.log(res);
          if(res.message === 'success'){
            // navigate to signin page
            this.router.navigate(['/login']);
            this.isLoading = false;
          }
        },
        error: (err)=> {
          console.log(err);
          this.isLoading = false;
        }
      })
    }else {
      this.registerForm.markAllAsTouched();
      this.isLoading = false;
    }
  }
  confirmPasswordValidator() {
    return (form: AbstractControl)=>{
      const password = form.get('password');
      const rePassword = form.get('rePassword');

      // show any error
      if (!password || !rePassword) {
      return null;
    }

    if (rePassword.errors && !rePassword.errors['passwordMismatch']) {
      return null; // Other errors on confirm password, no need to re-validate mismatch
    }

      if(password?.value === rePassword?.value){
        return null;
      } else {
        return {mismatch:true};
      }
    }
  }
  get nameControl(): FormControl {
  return this.registerForm.get('name') as FormControl;
}
  get emailControl(): FormControl {
  return this.registerForm.get('email') as FormControl;
}
get passwordControl(): FormControl {
  return this.registerForm.get('password') as FormControl;
}
get rePasswordControl(): FormControl {
  return this.registerForm.get('rePassword') as FormControl;
}
get dateOfBirthControl(): FormControl {
  return this.registerForm.get('dateOfBirth') as FormControl;
}
get genderControl(): FormControl {
  return this.registerForm.get('gender') as FormControl;
}

}
