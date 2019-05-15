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

  /*
  saveQuiz(quiz): void{
    this.quizzes.push({
      _id: String(this.quizzes.length + 1),
      visible: false,
      user: {
        _id: '1',
        username: 'something',
        password: 'testPass',
        email: 'test@test.dk',
        gender: Gender.FEMALE,
        birthDate: new Date(1994, 11, 9)
      },
      title: quiz.title,
      questions: quiz.questions
    });

    console.log(this.quizzes)
  }

  findQuiz(searchForId: string): Quiz {
    return this.getQuizzes().find(quiz => quiz._id === searchForId);
  }

  getQuizzes(): Quiz[] {
    return [
      {
        _id: '1',
        visible: false,
        user: {
        _id: '1', username: 'username1', email: 'one@email.com', gender: Gender.FEMALE,
        birthDate: new Date(1994, 11, 9)
        },
        title: 'Dogs',
        questions: [
          {
            title: 'How many feet does a puddle have',
            options: [
              {answer: '1', correct: false},
              {answer: '2', correct: false},
              {answer: '3', correct: false},
              {answer: '4', correct: true}
            ]
          },
          {
            title: 'How long do you need to walk the dog?',
            options: [
              {answer: 'For 10 minutes', correct: false},
              {answer: 'For 20 minutes', correct: false},
              {answer: 'For 30 minutes', correct: true},
              {answer: 'For 40 minutes', correct: false}
            ]
          }
        ]
      },
      {
        _id: '2',
        visible: false,
        user: {
          _id: '2', username: 'username2', email: 'two@email.com', gender: Gender.MALE,
          birthDate: new Date(1990, 2, 23)
        },
        title: 'Fish',
        questions: [
          {
            title: 'What do you call a fish with a tie?',
            options: [
              {answer: 'Weird', correct: false},
              {answer: 'soFISHticated', correct: true},
              {answer: 'Not gonna happen', correct: false},
              {answer: 'Dont know', correct: false}
            ]
          }
        ]
      }
    ]
  }

  getQuiz(): Quiz {
    return {
      _id: '1',
      visible: false,
      user: {
        _id: '2', username: 'username2', email: 'two@email.com', gender: Gender.MALE,
        birthDate: new Date(1990, 2, 23)
      }, title: 'Dogs',
      questions: [
        {
          title: 'How many feet does a puddle have',
          options: [
            {answer: '1', correct: false},
            {answer: '2', correct: false},
            {answer: '3', correct: false},
            {answer: '4', correct: true}
          ]
        },
        {
          title: 'How long do you need to walk the dog?',
          options: [
            {answer: 'For 10 minutes', correct: false},
            {answer: 'For 20 minutes', correct: false},
            {answer: 'For 30 minutes', correct: true},
            {answer: 'For 40 minutes', correct: false}
          ]
        }
      ]
    };
  }*/
}
