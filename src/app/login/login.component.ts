import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {AuthService} from "../auth/auth.service";
import { QuizActions } from '../quiz.actions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder,
              private router: Router,
              private authService: AuthService,
              private quizActions: QuizActions
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
    this.quizActions.setLoggedIn(true);
    if (this.loginForm.valid) {
      if (this.loginForm.value.username === 'admin') {
        //Login as admin
        this.quizActions.setAdminLoggedIn(true);
        this.authService.login(true).subscribe(result => {
          this.router.navigate(['user/admin']);
        });
      } else {
        this.authService.login(false).subscribe(result => {
          this.router.navigate(['user/allQuizzes'])
        })
      }
    } else {
      //Show an error message
    }
  }
}
