import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EvaluationService {

  evaluationURL: string = "http://localhost:3000/api/evaluation";
  constructor(private http: HttpClient) { }

  studentEvaluation(evalObj) {
    return this.http.post<{msg: string}>(`${this.evaluationURL}`, evalObj);
  }

  getStudentEval(x,y) {
    return this.http.get<{eval: any}>(`${this.evaluationURL}/stEval/${x}/${y}`);
  }

}
