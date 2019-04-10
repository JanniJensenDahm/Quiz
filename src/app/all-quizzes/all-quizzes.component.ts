import { Component, OnInit } from '@angular/core';
import {Quiz} from "../entities/quiz";
import {TempDataService} from "../service/temp-data.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-all-quizzes',
  templateUrl: './all-quizzes.component.html',
  styleUrls: ['./all-quizzes.component.scss']
})
export class AllQuizzesComponent implements OnInit {

  quizzes: Quiz[];

  constructor(private tempData: TempDataService, private  router: Router) { }

  ngOnInit() {

    this.quizzes = this.tempData.getQuizzes();
  }

  clickQuiz(quiz : Quiz) {
    console.log(quiz);
    this.router.navigate(['/user/quiz/' + quiz._id]);
  }

}
