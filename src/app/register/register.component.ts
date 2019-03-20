import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;

  constructor(private fb: FormBuilder) {
  }

  ngOnInit() {
    this.registerForm = this.fb.group(
      {
        name: ['', [Validators.required]],
        age: ['', [Validators.required]],
        username: ['', [Validators.required, Validators.minLength(3)]],
        password: ['', Validators.required]
      }
    );
  }

  onSubmit(): void {
    console.log(this.registerForm);

    if (this.registerForm.valid) {
      // Data to server
    } else {
      // Error message
    }
  }

}
