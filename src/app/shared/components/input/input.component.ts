import { CommonModule } from '@angular/common';
import { Component, Directive, input, InputSignal, OnInit } from '@angular/core';
import { AbstractControl, FormControl, ReactiveFormsModule } from '@angular/forms';
import { initFlowbite } from 'flowbite';

@Component({
  selector: 'app-input',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './input.component.html',
  styleUrl: './input.component.css'
})
export class InputComponent implements OnInit{
  type:InputSignal<string> = input.required();
  id:InputSignal<string> = input.required();
  placeholder:InputSignal<string> = input.required();

  control: InputSignal<FormControl<any>> = input.required();




  ngOnInit(): void {
    initFlowbite()
  }
}
