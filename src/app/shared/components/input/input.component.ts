import { Component, input, InputSignal, OnInit } from '@angular/core';
import { initFlowbite } from 'flowbite';

@Component({
  selector: 'app-input',
  imports: [],
  templateUrl: './input.component.html',
  styleUrl: './input.component.css'
})
export class InputComponent implements OnInit{
  type:InputSignal<string> = input.required();
  id:InputSignal<string> = input.required();
  placeholder:InputSignal<string> = input.required();

  ngOnInit(): void {
    initFlowbite()
  }
}
