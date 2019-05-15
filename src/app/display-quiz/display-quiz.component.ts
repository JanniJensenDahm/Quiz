import { Component, OnInit } from '@angular/core';
import {Quiz} from "../entities/quiz";
import {TempDataService} from "../service/temp-data.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-display-quiz',
  templateUrl: './display-quiz.component.html',
  styleUrls: ['./display-quiz.component.scss']
})
export class DisplayQuizComponent implements OnInit {

  quiz: Quiz;

  constructor(
    private tempData: TempDataService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    /*
    const id = '1';
    this.quizInput = this.tempData.findQuiz(id)
    */
    const id = this.route.snapshot.paramMap.get("id");
    this.quiz = this.tempData.getQuiz(id);
  }

}
