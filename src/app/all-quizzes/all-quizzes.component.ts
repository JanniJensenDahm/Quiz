import { Component, OnInit } from '@angular/core';
import { Quiz } from "../entities/quiz";
import { TempDataService } from "../service/temp-data.service";
import { Router } from "@angular/router";
import { NgRedux } from '@angular-redux/store';
import { AppState } from '../store'
import { QuizActions } from '../quiz.actions';

@Component({
  selector: 'app-all-quizzes',
  templateUrl: './all-quizzes.component.html',
  styleUrls: ['./all-quizzes.component.scss']
})
export class AllQuizzesComponent implements OnInit {

  quizzes: Quiz[];
  isLoading: boolean;

  constructor(
    private tempData: TempDataService, 
    private  router: Router,
    private ngRedux: NgRedux<AppState>,
    private quizActions: QuizActions) { }

  ngOnInit() {
    this.ngRedux.select(state => state.quizzes).subscribe(result =>{
      this.quizzes = result.quizzes;
      this.isLoading = result.isLoading;
    });
    this.quizActions.getQuizzes();
  }

  quizClicked(quiz : Quiz) {
    console.log(quiz);
    this.router.navigate(['/user/displayQuiz/' + quiz._id]);
  }

}
