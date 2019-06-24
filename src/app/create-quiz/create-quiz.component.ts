import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { TempDataService } from '../service/temp-data.service';
import { Router } from "@angular/router";
import { NgRedux } from '@angular-redux/store';
import { AppState } from '../redux/store';
import { Quiz } from '../entities/quiz';
import { QuizActions } from '../redux/quiz.actions'
import { QuizApiService } from '../api/quiz-api.service'
import { Gender } from '../entities/user';

@Component({
  selector: 'app-create-quiz',
  templateUrl: './create-quiz.component.html',
  styleUrls: ['./create-quiz.component.scss']
})
export class CreateQuizComponent implements OnInit {
  createQuiz: FormGroup;
  quizzes: Quiz[];
  disableBtn;

  constructor(
    private fb: FormBuilder,
    private data: TempDataService,
    private router: Router,
    private ngRedux: NgRedux<AppState>,
    private quizActions: QuizActions,
    private quizApi: QuizApiService) { }

  ngOnInit() {
    this.createQuiz = this.fb.group({
      title: [''],
      questions: this.fb.array([]),
    })
  }

  onSubmit() {

    this.createQuiz.value.visible = false;
    this.createQuiz.value.user = {
      _id: '1',
      firstname: 'Janni',
      lastname: 'Jensen-Dahm',
      birthDate: new Date(1994, 9, 11),
      gender: Gender.FEMALE,
      email: 'janni@jensen-dahm.dk',
      username: 'JJD',
      password: 'JJD'
    };
    this.createQuiz.value.created = new Date();
    this.createQuiz.value.ratings = [{
      grade: 0,
      user: {
        _id: '1',
        firstname: 'Janni',
        lastname: 'Jensen-Dahm',
        birthDate: new Date(1994, 9, 11),
        gender: Gender.FEMALE,
        email: 'janni@jensen-dahm.dk',
        username: 'JJD',
        password: 'JJD'
      }
    }]

    //Execute first
    this.quizApi.createQuiz(this.createQuiz.value).subscribe(result => {
      //Execute third
      this.quizActions.createQuiz(result);
      this.router.navigate(['user/allQuizzes']);
    }, error => {
      console.log('Error: ' + error)
    });
    //Execute second - create QuizActions.DISABLE_SAVEBTN
    this.disableBtn = true;
  }


  createNewQuestion() {
    const question = this.fb.group({
      title: ['', Validators.required],
      options: this.fb.array([])
    });

    const questions = this.createQuiz.controls.questions as FormArray;
    const options = question.controls.options as FormArray;
    options.push(this.createNewOptionGroup());
    options.push(this.createNewOptionGroup());
    options.push(this.createNewOptionGroup());
    options.push(this.createNewOptionGroup());
    questions.push(question);
  }


  private createNewOptionGroup(): FormGroup {
    return this.fb.group({
      answer: ['', Validators.required],
      correct: [false, Validators.required]
    });
  }
}
