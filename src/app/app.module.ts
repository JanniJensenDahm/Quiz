import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCheckboxModule, MatFormFieldModule, MatInputModule, MatMenuModule } from "@angular/material";
import { MatSidenavModule } from "@angular/material/sidenav";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatToolbarModule } from "@angular/material/toolbar";
import { AboutComponent } from './about/about.component';
import { AdminComponent } from './admin/admin.component';
import { UserComponent } from './user/user.component';
import { AllQuizzesComponent } from './all-quizzes/all-quizzes.component';
import { CreateQuizComponent } from './create-quiz/create-quiz.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { MatCardModule } from "@angular/material/card";
import { HomeComponent } from './home/home.component';
import { MatButtonModule } from '@angular/material/button';
import { DisplayQuizComponent } from './display-quiz/display-quiz.component';
import { QuizComponent } from './quiz/quiz.component';
import { AppState } from './redux/store';
import { NgRedux, NgReduxModule, DevToolsExtension } from '@angular-redux/store';
import { NgReduxRouter, NgReduxRouterModule } from '@angular-redux/router'
import { rootReducer } from './redux/store';
import { HttpClientModule } from '@angular/common/http';
import { QuizPipe } from './pipe/quiz.pipe';
import { UpdateQuizComponent } from './update-quiz/update-quiz.component';
import { MatChipsModule } from '@angular/material';
import { MatSelectModule } from '@angular/material/select';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    AboutComponent,
    AdminComponent,
    UserComponent,
    AllQuizzesComponent,
    CreateQuizComponent,
    PageNotFoundComponent,
    HomeComponent,
    DisplayQuizComponent,
    QuizComponent,
    QuizPipe,
    UpdateQuizComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    MatCheckboxModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatFormFieldModule,
    MatSidenavModule,
    MatToolbarModule,
    MatMenuModule,
    MatCardModule,
    MatButtonModule,
    NgReduxModule, 
    NgReduxRouterModule.forRoot(),
    HttpClientModule,
    MatChipsModule,
    MatSelectModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  exports: [MatMenuModule]
})
export class AppModule {
  constructor(
    private ngRedux: NgRedux<AppState>,
    private ngReduxRouter: NgReduxRouter,
    private devTool: DevToolsExtension){

      this.ngRedux.configureStore(rootReducer, {}, [],[ devTool.isEnabled() ? devTool.enhancer() : f => f]);
      ngReduxRouter.initialize();
    }
}
