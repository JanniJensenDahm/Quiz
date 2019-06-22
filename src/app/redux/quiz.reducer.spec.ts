import { QuizActions } from './quiz.actions';
import { quizReducer } from './quiz.reducer';
import { Quiz } from '../entities/quiz';
import { QuizState } from './store';
var deepFreeze = require('deep-freeze');

describe('quiz reducer tests', () => {
  // each it block is a test case.

  it('should set state to true when logging in', () => {
    let startState = {isLoggedIn: false, isAdminLoggedIn: false, quizzes: [], isLoading: false};
    deepFreeze(startState);
    let actionObj = { 
      type: QuizActions.LOG_IN, payload: true};
    let newStateObj = quizReducer(startState, actionObj);
    expect(newStateObj).toEqual({isLoggedIn: true, isAdminLoggedIn: false, quizzes: [], isLoading: false});
  });


  //Tests if it creates a new quiz
  it('should create new quiz', () => {
    //Arrange - Act - Assert

    //Arrange
    let startState = {quizzes: []} as QuizState;
    deepFreeze(startState);
    let quiz = { title: 'Test quiz', questions: [] } as Quiz;
    let actionObj = { type: QuizActions.CREATE_QUIZ, payload: quiz };

    //Act
    let newStateObj = quizReducer(startState, actionObj);
    
    //Assert
    expect(newStateObj.quizzes.length).toBe(1);
    expect(newStateObj.quizzes[0].title).toBe('Test quiz');
  });

  //Test update quiz
  it('should update an existing quiz', () => {
    let startState = {quizzes: []} as QuizState;
    deepFreeze(startState);
    let quiz = { title: 'Test quiz', questions: [] } as Quiz;
    let createActionObj = { type: QuizActions.CREATE_QUIZ, payload: quiz };
    let newStateObj = quizReducer(startState, createActionObj);

    quiz = {title: 'UPDATED Test quiz', questions: []} as Quiz;
    let updateActionObj = {type: QuizActions.UPDATE_QUIZ, payload: quiz}
    let state2 = quizReducer(newStateObj, updateActionObj);

    expect(newStateObj.quizzes[0].title).not.toEqual(state2.quizzes[0].title)
  });

  //Test delete quiz
  it('Should delete an existing quiz', () => {
    let startState = {quizzes: []} as QuizState;
    deepFreeze(startState);
    let quiz = {title: 'Test quiz', questions: []} as Quiz;
    let delActionObj = {type: QuizActions.DELETE_QUIZ, payload: quiz};
    let createActionObj = {type: QuizActions.CREATE_QUIZ, payload: quiz};
    let newStateObj = quizReducer(startState, createActionObj);
    let x = quizReducer(newStateObj, createActionObj);

    expect(x.quizzes.length).toBe(2);
    quizReducer(x, delActionObj);
    expect(newStateObj.quizzes.length).toBe(1);
  });

  //Test wrong input

});
