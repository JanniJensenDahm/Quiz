import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { TempDataService } from '../service/temp-data.service';
import { Router } from "@angular/router";
import { NgRedux } from '@angular-redux/store';
import { AppState } from '../store';
import { Quiz } from '../entities/quiz';
import { QuizActions } from '../quiz.actions'
import { QuizApiService } from '../quiz-api.service'

@Component({
  selector: 'app-create-quiz',
  templateUrl: './create-quiz.component.html',
  styleUrls: ['./create-quiz.component.scss']
})
export class CreateQuizComponent implements OnInit {
  createQuiz: FormGroup;
  quizzes: Quiz[];

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
    this.quizApi.createQuiz(this.createQuiz.value).subscribe(result => {
      this.quizActions.createQuiz(result);
      this.router.navigate(['user/allQuizzes']);
    }, error => {
      console.log('Error: ' + error)
    });
    //this.data.saveQuiz(this.createQuiz.value);
    //this.router.navigate(['user/allQuizzes']);
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
