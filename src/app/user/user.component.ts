import { Component, OnInit } from '@angular/core';
import {Quiz} from "../entities/quiz";
import {TempDataService} from "../service/temp-data.service";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  quizzes: Quiz[];

  constructor(private tempData: TempDataService) { }

  ngOnInit() {

    this.quizzes = this.tempData.getQuizzes();
  }

}
