import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Quiz} from "../entities/quiz";
import {TempDataService} from "../service/temp-data.service";
import {ActivatedRoute, Router} from "@angular/router";
import { QuizApiService } from '../quiz-api.service';
import { QuizActions } from '../quiz.actions';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss']
})
export class QuizComponent implements OnInit {

  @Input() quizInput : Quiz;
  @Output() quizClicked : EventEmitter<any> = new EventEmitter<any>();

  constructor(
    private quizApi: QuizApiService,
    private quizActions: QuizActions,
    private router: Router,
  ) { }

  ngOnInit() {
  }

  clickedQuiz() {
    console.log(this.quizInput._id);
    console.log(this.quizInput.title);
    this.quizClicked.emit(this.quizInput);
  }

  quizDelete() {
    this.quizApi.deleteQuiz(this.quizInput._id).subscribe(result => {
      this.quizActions.deleteQuiz(result);
      this.router.navigate(['user/allQuizzes'])
    }, error => {
      console.log('Error: ' + error)
    })
  }
}
