import { Component, OnInit } from '@angular/core';
import {Quiz} from "../entities/quiz";
import {TempDataService} from "../service/temp-data.service";
import {ActivatedRoute} from "@angular/router";
import { QuizActions } from '../quiz.actions';
import { NgRedux } from '@angular-redux/store';
import { AppState } from '../store';

@Component({
  selector: 'app-display-quiz',
  templateUrl: './display-quiz.component.html',
  styleUrls: ['./display-quiz.component.scss']
})
export class DisplayQuizComponent implements OnInit {

  quiz: Quiz;
  quizzes: Quiz[];

  constructor(
    private tempData: TempDataService,
    private route: ActivatedRoute,
    private quizActions: QuizActions,
    private ngRedux: NgRedux<AppState>,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.quizActions.getQuizzes();
    this.ngRedux.select(x => x.quizzes).subscribe(result => {
      this.quizzes = result.quizzes;
    });

    this.quiz = this.quizzes.find(quiz => quiz._id === this.activatedRoute.snapshot.params.id);
  }

}
