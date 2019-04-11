import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Quiz} from "../entities/quiz";
import {TempDataService} from "../service/temp-data.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss']
})
export class QuizComponent implements OnInit {

  @Input() quizInput : Quiz;
  @Output() quizClicked : EventEmitter<any> = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {
  }

  clickedQuiz() {
    this.quizClicked.emit(this.quizInput);
  }
}
