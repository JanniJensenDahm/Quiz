import { routerReducer } from '@angular-redux/router';
import { combineReducers } from 'redux';
import { quizReducer } from './quiz.reducer';
import { Quiz } from '../entities/quiz';

export class QuizState {
  isLoggedIn: boolean;
  isAdminLoggedIn: boolean;
  quizzes: Quiz[];
  isLoading : boolean;
}
export class AppState {
  quizzes?: QuizState;
}
export const rootReducer = combineReducers<AppState>({
  quizzes: quizReducer,
  router: routerReducer
} as any);
