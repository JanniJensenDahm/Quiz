import { Component, OnInit } from '@angular/core';
import { TempDataService } from '../service/temp-data.service';
import {ActivatedRoute, Router} from '@angular/router';
import { QuizActions } from '../redux/quiz.actions';
import { NgRedux } from '@angular-redux/store';
import { AppState } from '../redux/store';
import { Quiz } from '../entities/quiz';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import {QuizApiService} from "../api/quiz-api.service";

@Component({
  selector: 'app-update-quiz',
  templateUrl: './update-quiz.component.html',
  styleUrls: ['./update-quiz.component.scss']
})
export class UpdateQuizComponent implements OnInit {

  quiz: Quiz;
  quizzes: Quiz[];
  editQuiz: FormGroup;

  constructor(
    private tempData: TempDataService,
    private route: ActivatedRoute,
    private quizActions: QuizActions,
    private ngRedux: NgRedux<AppState>,
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private quizApi: QuizApiService,
    private router: Router
  ) { }

  ngOnInit() {
    this.quizActions.getQuizzes();
    this.ngRedux.select(x => x.quizzes).subscribe(result => {
      this.quizzes = result.quizzes;
    });

    this.quiz = this.quizzes.find(quiz => quiz._id === this.activatedRoute.snapshot.params.id);
    
    console.log(this.quiz);
    this.editQuiz = this.fb.group({
      title: [this.quiz.title, Validators.required],
      questions: this.fb.array([])
    });

    let index = 0;
    this.quiz.questions.forEach(element => {
      const questions = this.editQuiz.controls.questions as FormArray;
      questions.push(this.fb.group({
        title: [element.title],
        options: this.fb.array([])
      }));

      const options = questions.controls[index].controls.options as FormArray;
      this.quiz.questions[index].options.forEach( option => {
        options.push(this.fb.group({
          answer: [option.answer],
          correct: [option.correct] 
        }));
      });
      index++;
    });
  }

  createNewQuestion() {
    const question = this.fb.group({
      title: ['', Validators.required],
      options: this.fb.array([])
    });

    const questions = this.editQuiz.controls.questions as FormArray;
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

  onSubmit() {
    const id = this.route.snapshot.paramMap.get('id');
    let quiz = this.editQuiz.value as Quiz;

    quiz.customerId = 'janni';
    quiz._id = id;

    this.quizApi.updateQuiz(quiz).subscribe(quizFormWs => {
      this.quizActions.updateQuiz(quizFormWs);
      this.router.navigate(['/user/allQuizzes']);
    })
  }
}
