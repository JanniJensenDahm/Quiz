import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Quiz } from "../entities/quiz";
import { TempDataService } from "../service/temp-data.service";
import { ActivatedRoute, Router } from "@angular/router";
import { QuizApiService } from '../api/quiz-api.service';
import { QuizActions } from '../redux/quiz.actions';
import { NgRedux } from '@angular-redux/store';
import { AppState } from '../redux/store';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss']
})
export class QuizComponent implements OnInit {

  quizzes: Quiz[]
  @Input() quizInput: Quiz;
  @Output() quizClicked: EventEmitter<any> = new EventEmitter<any>();
  @Output() quizEdit: EventEmitter<any> = new EventEmitter<any>();
  @Output() quizDelete: EventEmitter<any> = new EventEmitter<any>();

  constructor(
    private quizApi: QuizApiService,
    private quizActions: QuizActions,
    private router: Router,
    private ngReducx: NgRedux<AppState>
  ) { }

  ngOnInit() {
    //Get all quizzes
    this.ngReducx.select(state => state.quizzes).subscribe(result => {
      this.quizzes = result.quizzes;
    });

    //Calculate average rating

    this.quizzes.forEach(quiz => {
      if (quiz.ratings.length > 1) {
        let totRating = 0;
        quiz.ratings.forEach(rating => {
          totRating += rating.grade;
        });
        quiz.avrRating = totRating / (quiz.ratings.length-1);
      }else{
        quiz.avrRating = 0.0
      }
    });
  }

  clickedQuiz() {
    this.quizClicked.emit(this.quizInput);
  }

  deleteQuiz() {
    this.quizDelete.emit(this.quizInput)
  }

  editQuiz() {
    this.quizEdit.emit(this.quizInput)
  }
}
