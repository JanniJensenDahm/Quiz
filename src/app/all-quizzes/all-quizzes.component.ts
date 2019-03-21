import { Component, OnInit } from '@angular/core';
import {Quiz} from "../entities/quiz";
import {TempDataService} from "../service/temp-data.service";

@Component({
  selector: 'app-all-quizzes',
  templateUrl: './all-quizzes.component.html',
  styleUrls: ['./all-quizzes.component.scss']
})
export class AllQuizzesComponent implements OnInit {

  quizzes: Quiz[];

  constructor(private tempData: TempDataService) { }

  ngOnInit() {

    this.quizzes = this.tempData.getQuizzes();
  }

}
