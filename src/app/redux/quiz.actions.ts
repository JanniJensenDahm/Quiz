import { Injectable } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { AppState } from './store';
import { Quiz, Rating } from './entities/quiz';
import { QuizApiService } from './quiz-api.service';

@Injectable({ providedIn: 'root' })

export class QuizActions {
  constructor(
    private ngRedux: NgRedux<AppState>,
    private quizApi: QuizApiService) { }

  static ADMIN_LOG_IN: string = 'ADMIN_LOG_IN';
  static LOG_IN: string = 'LOG_IN';
  static CREATE_QUIZ: string = 'CREATE_QUIZ';
  static UPDATE_QUIZ: string = 'UPDATE_QUIZ';
  static DELETE_QUIZ: string = 'DELETE_QUIZ';
  static CREATE_RATING: string = 'CREATE_RATING';

  static GET_QUIZZES_LOADING: string = 'GET_QUIZZES_LOADING';
  static GET_QUIZZES_SUCCESS: string = 'GET_QUIZZES_SUCCESS';
  static GET_QUIZZES_FAILED: string = 'GET_QUIZZES_FAILED';

  getQuizzes() : void {
    //Start a 'spinner'
    this.ngRedux.dispatch({type: QuizActions.GET_QUIZZES_LOADING});

    //Call ws
    this.quizApi.getAllQuizzes().subscribe(quizzes =>{
      console.log(quizzes.filter(quiz => quiz.customerId === 'janni'));
      this.ngRedux.dispatch({
        type: QuizActions.GET_QUIZZES_SUCCESS,
        payload: quizzes.filter(quiz => quiz.customerId === 'janni')
      })
    }, error => {
      this.ngRedux.dispatch({
        type: QuizActions.GET_QUIZZES_FAILED,
        payload: error
      })
    });
  }


  setLoggedIn(isLoggedIn: boolean): void {
    console.log("Logged in: " + isLoggedIn);

    this.ngRedux.dispatch({
      type: QuizActions.LOG_IN,
      payload: isLoggedIn
    })

  }

  setAdminLoggedIn(isAdminLoggedIn: boolean): void {
    console.log("Logged in Admin: " + isAdminLoggedIn);
    this.ngRedux.dispatch({
      type: QuizActions.ADMIN_LOG_IN,
      payload: isAdminLoggedIn
    })
  }

  createQuiz(quiz: Quiz): void {
    this.ngRedux.dispatch({
      type: QuizActions.CREATE_QUIZ,
      payload: quiz
    });
  }
  updateQuiz(quiz : Quiz) {
    this.ngRedux.dispatch({
      type: QuizActions.UPDATE_QUIZ,
      payload: quiz
    });
  }

  deleteQuiz(id: string) {
    this.ngRedux.dispatch({
      type: QuizActions.DELETE_QUIZ,
      payload: id
    });
  }

  createRating(rating: Rating, quizId: string) {
    this.ngRedux.dispatch({
      type: QuizActions.CREATE_RATING,
      //payload: {rating: rating, quizId: quizId} - hvis key og value har samme værdi skrives det kun en gang
      payload: { rating, quizId }
    })
  }
}
