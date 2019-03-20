import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {AuthService} from "../auth/auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder,
              private router: Router,
              private authService: AuthService
  ) {
  }

  ngOnInit() {
    this.loginForm = this.fb.group(
      {
        username: ['', [Validators.required, Validators.minLength(3)]],
        password: ['', Validators.required]
      }
    )
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      if (this.loginForm.value.username === 'admin') {
        //Login as admin
        this.authService.login(true).subscribe(result => {
          this.router.navigate(['user/allQuizzes']);
        });
      }
    } else {
      //Show an error message
    }
  }
}
