import { QuizPipe } from './quiz.pipe';
import {TestBed} from '@angular/core/testing';
import {Quiz} from "../entities/quiz";

describe('QuizPipe', () => {

  const pipe = new QuizPipe();
  const quizzes: Quiz[] = [{
    _id: '1',
    title: 'Title 1',
    questions: [{
      title: 'Question 1',
      options: [{
        answer: 'Answer 1',
        correct: true
      },
        {
          answer: 'Answer 2',
          correct: false
        },
        {
          answer: 'Anser 3',
          correct: false
        },
        {
          answer: 'Answer 4',
          correct: false
        }],
    }],
  },
  {
    _id: '2',
    title: 'Title 2',
    questions: [{
      title: 'Question 2',
      options: [{
        answer: 'Answer 1',
        correct: true
      },
        {
          answer: 'Answer 2',
          correct: false
        },
        {
          answer: 'Anser 3',
          correct: false
        },
        {
          answer: 'Answer 4',
          correct: false
        }],
    }],
  },
  {
    _id: '3',
    title: 'Title 3',
    questions: [{
      title: 'Question 3',
      options: [{
        answer: 'Answer 1',
        correct: true
      },
        {
          answer: 'Answer 2',
          correct: false
        },
        {
          answer: 'Anser 3',
          correct: false
        },
        {
          answer: 'Answer 4',
          correct: false
        }],
    }],
  },
  {
    _id: '4',
    title: 'Title 4',
    questions: [{
      title: 'Question 4',
      options: [{
        answer: 'Answer 1',
        correct: true
      },
        {
          answer: 'Answer 2',
          correct: false
        },
        {
          answer: 'Anser 3',
          correct: false
        },
        {
          answer: 'Answer 4',
          correct: false
        }],
    }],
  }];

  beforeEach(() => {

  });

  TestBed.configureTestingModule({
    declarations: [
      QuizPipe
    ],
  });

  //Create new quizzes and expect length of result to equal length of quizzes
  it('should test if length of quizzes matches', () => {
    let result = pipe.transform(quizzes, '');
    expect(result.length).toBe(quizzes.length);
  });

  //Create quizzes, serch for Title 1 and expect to get 1 match
  it('Should search Title 1', () => {
    let result = pipe.transform(quizzes, 'Title 1');
    expect(result.length).toBe(1);
  });

  //Create quizzes, search for Title and expect to get length of quizzes
  it('should search for Title',() => {
    let result = pipe.transform(quizzes, 'Title');
    expect(result.length).toBe(quizzes.length)
  });

  //Test wrong input
});
