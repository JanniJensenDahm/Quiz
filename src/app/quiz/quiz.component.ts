import { Component, OnInit } from '@angular/core';
import {Quiz} from "../entities/quiz";
import {TempDataService} from "../service/temp-data.service";

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss']
})
export class QuizComponent implements OnInit {

  quiz: Quiz;

  constructor(private tempData: TempDataService) { }

  ngOnInit() {
    /*
    const id = '1';
    this.quiz = this.tempData.findQuiz(id)
    */
    this.quiz = this.tempData.getQuiz();
  }

}
