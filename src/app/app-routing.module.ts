import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent} from "./login/login.component";
import { QuizComponent } from "./quiz/quiz.component";
import { RegisterComponent } from "./register/register.component";
import { AboutComponent } from "./about/about.component";
import { UserComponent } from "./user/user.component";
import { AuthGuard } from "./auth/auth.guard";
import {AllQuizzesComponent} from "./all-quizzes/all-quizzes.component";
import {CreateQuizComponent} from "./create-quiz/create-quiz.component";
import {AdminComponent} from "./admin/admin.component";
import {PageNotFoundComponent} from "./page-not-found/page-not-found.component";

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full'},

  { path: 'about', component: AboutComponent },
  { path: 'login', component: LoginComponent },
  { path: 'user', component: UserComponent, canActivate: [AuthGuard],
    children: [
      { path: 'allQuizzes', component: AllQuizzesComponent },
      { path: 'quiz', component: QuizComponent},
      { path: 'createQuiz', component: CreateQuizComponent },
     // { path: 'admin', component: AdminComponent, canActivate: [AdminGuard]}
    ]},
  { path: 'register', component: RegisterComponent},
  { path: '**', component: PageNotFoundComponent}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
