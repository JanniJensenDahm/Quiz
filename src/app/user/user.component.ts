import { Component, OnInit } from '@angular/core';
import { QuizActions } from '../redux/quiz.actions';
import { AuthService } from '../auth/auth.service';
import { NgRedux } from '@angular-redux/store';
import { AppState } from '../redux/store';
import { Router, Route } from '@angular/router'

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  events: string[] = [];
  adminLoggedIn: boolean;

  constructor(
    private authService: AuthService,
    private quizActions: QuizActions,
    private ngRedux: NgRedux<AppState>,
    private router: Router
    ) { }

  ngOnInit() {

    this.ngRedux.select(state => state.quizzes).subscribe(result => {
      this.adminLoggedIn = result.isAdminLoggedIn;
    })
  }

  logOut() {
    this.quizActions.setLoggedIn(false);
    this.quizActions.setAdminLoggedIn(false);
    this.router.navigate([''])
  }

}
