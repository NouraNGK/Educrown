import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AffectationService {

  affectationURL: string = "http://localhost:3000/api/affectation";
  constructor(private http: HttpClient) { }

  assignStudentToCourse(obj) {
    return this.http.post<{ msg: string }>(this.affectationURL, obj);
  }

  getAffectedStudentsByCourseId(id) {
    return this.http.get<{ students: any, msg: string }>(`${this.affectationURL}` + "/affectedSrudents/" + `${id}`);
  }
}
