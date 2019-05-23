import { Component, OnInit } from '@angular/core';
import { TempDataService } from '../service/temp-data.service';
import { ActivatedRoute } from '@angular/router';
import { QuizActions } from '../quiz.actions';
import { NgRedux } from '@angular-redux/store';
import { AppState } from '../store';
import { Quiz } from '../entities/quiz';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';

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
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.quizActions.getQuizzes();
    this.ngRedux.select(x => x.quizzes).subscribe(result => {
      this.quizzes = result.quizzes;
    });

    this.quiz = this.quizzes.find(quiz => quiz._id === this.activatedRoute.snapshot.params.id);
    
    console.log(this.quiz)
    this.editQuiz = this.fb.group({
      title: [this.quiz.title, Validators.required],
      questions: this.fb.array([])
    })

    let index = 0;
    this.quiz.questions.forEach(element => {
      const questions = this.editQuiz.controls.questions as FormArray;
      questions.push(this.fb.group({
        title: [element.title],
        options: this.fb.array([])
      }));
      console.log(this.quiz)
      console.log(this.editQuiz)
      //const options = (<FormGroup>questions.controls[index]).controls.options as FormArray;
      const options = questions.controls[index].controls.options as FormArray;
      console.log("options " + options)
      this.quiz.questions[index].options.forEach( option => {
        options.push(this.fb.group({
          answer: [option.answer],
          correct: [option.correct] 
        }));
      });
      index++;
    });
    
    console.log(this.editQuiz)
  }
}
