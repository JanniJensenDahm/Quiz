import {Injectable} from '@angular/core';
import {Quiz} from '../entities/quiz';
import {Gender} from '../entities/user';

@Injectable({
  providedIn: 'root'
})
export class TempDataService {

  quizzes: Quiz[];

  constructor() {
    this.quizzes = this.getQuizzes();
  }

  getQuiz(id: string): Quiz {
    return this.quizzes.find(quiz => quiz._id === id);
  }

  getQuizzes(): Quiz [] {
    return this.quizzes;
  }
}
