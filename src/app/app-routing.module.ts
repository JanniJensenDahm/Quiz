import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent} from "./login/login.component";
import { RegisterComponent } from "./register/register.component";
import { AboutComponent } from "./about/about.component";
import { UserComponent } from "./user/user.component";
import { AuthGuard } from "./auth/auth.guard";
import { AllQuizzesComponent } from "./all-quizzes/all-quizzes.component";
import { CreateQuizComponent } from "./create-quiz/create-quiz.component";
import { AdminComponent } from "./admin/admin.component";
import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";
import { AdminGuard } from "./auth/admin.guard";
import { HomeComponent } from "./home/home.component";
import { DisplayQuizComponent } from "./display-quiz/display-quiz.component";
import { UpdateQuizComponent } from "./update-quiz/update-quiz.component"

const routes: Routes = [
  //Base url go to about
  { path: '', redirectTo: 'home', pathMatch: 'full'},

  {path: 'home', component: HomeComponent, children:[
      { path: 'about', component: AboutComponent },
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent},
    ]},
  { path: 'user', component: UserComponent, canActivate: [AuthGuard],
    children: [
      { path: 'allQuizzes', component: AllQuizzesComponent },
      { path: 'createQuiz', component: CreateQuizComponent },
      { path: 'displayQuiz/:id', component: DisplayQuizComponent },
      { path: 'admin', component: AdminComponent, canActivate: [AdminGuard]},
      { path: 'updateQuiz/:id', component: UpdateQuizComponent}
    ]},
  


  //If nothing matches, show page not found
  { path: '**', component: PageNotFoundComponent}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
