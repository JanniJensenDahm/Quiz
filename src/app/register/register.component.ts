import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private route: Router) {
  }

  ngOnInit() {
    this.registerForm = this.fb.group(
      {
        firstname: ['', Validators.required],
        lastname: ['', Validators.required],
        birthdate: ['', Validators.required],
        gender: ['', Validators.required],
        email: ['', Validators.required],
        username: ['', [
          Validators.required, 
          Validators.minLength(3)]],
        password: ['', [
          Validators.required, Validators.minLength(8)]]
      }
    );
  }

  onSubmit(): void {
    console.log(this.registerForm);

    if (this.registerForm.valid) {
      console.log('Valid form ' + this.registerForm)
      this.route.navigate(['home/login'])
    } else {
      console.log('You made a mistake')
    }
  }

}
