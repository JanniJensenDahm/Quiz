import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Quiz } from '../entities/quiz';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuizApiService {
  private baseUrl: string = "http://angular2api2.azurewebsites.net/api/internships"

  constructor(
    private http: HttpClient
  ) { }

  createQuiz(quiz: Quiz) : Observable<any>{
    quiz.customerId = 'janni'
    quiz.created = new Date();
    return this.http.post(this.baseUrl, quiz);
  }

  getAllQuizzes() : Observable<Quiz[]> {
    return this.http.get<Quiz[]>(this.baseUrl);
  }

  updateQuiz(quiz: Quiz) : Observable<any> {
    return this.http.put(this.baseUrl + "/" + quiz._id, quiz, {responseType: 'text'})
  }

  deleteQuiz(id: string) : Observable<any> {
    return this.http.delete(this.baseUrl + '/' + id, {responseType: 'text'});
  }

  rateQuiz(quiz: Quiz) : Observable<any>{
    return this.http.put(this.baseUrl + "/" + quiz._id, quiz, {responseType: 'text'})
  }
}
