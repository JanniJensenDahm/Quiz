import { Component, OnInit } from '@angular/core';
import {Quiz} from "../entities/quiz";
import {TempDataService} from "../service/temp-data.service";
import {ActivatedRoute} from "@angular/router";
import { QuizActions } from '../redux/quiz.actions';
import { NgRedux } from '@angular-redux/store';
import { AppState } from '../redux/store';

@Component({
  selector: 'app-display-quiz',
  templateUrl: './display-quiz.component.html',
  styleUrls: ['./display-quiz.component.scss']
})
export class DisplayQuizComponent implements OnInit {

  quiz: Quiz;
  quizzes: Quiz[];
  correct: number = 0;
  clickedOptions: any = new Set();
  


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

  correctAnswer(question, option, e) {
    const addClass = e.target.classList 

    if(!this.clickedOptions.has(option)){

      if(option.correct){
        this.correct += 1;
        addClass.add('correct-answer')
      }
      else{
        addClass.add('wrong-answer')
      }
    }

    for (let i = 0; i < question.options.length; i++){
      this.clickedOptions.add(question.options[i])
    }
  }

}
