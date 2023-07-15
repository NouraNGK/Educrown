import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  userURL: string = "http://localhost:3000/api/users";
  constructor(private http: HttpClient) { }

  signupTeacher(user: any, cv: File) {
    let formData = new FormData();
    formData.append("firstName", user.firstName);
    formData.append("lastName", user.lastName);
    formData.append("email", user.email);
    formData.append("tel", user.tel);
    formData.append("address", user.address);
    formData.append("pwd", user.pwd);
    formData.append("role", user.role);
    formData.append("specialty", user.specialty);
    formData.append("cv", cv);
    formData.append("status", user.status);
    return this.http.post<{ msg: string }>(this.userURL + "/signupTeacher", formData);
  }

  signupStudent(user: any, img: File) {
    let formData = new FormData();
    formData.append("firstName", user.firstName);
    formData.append("lastName", user.lastName);
    formData.append("email", user.email);
    formData.append("tel", user.tel);
    formData.append("address", user.address);
    formData.append("pwd", user.pwd);
    formData.append("role", user.role);
    formData.append("avatar", img);
    return this.http.post<{ msg: string }>(this.userURL + "/signupStudent", formData);
  }

  signupParent(user: any) {
    return this.http.post<{ msg: string }>(this.userURL + "/signupParent", user);
  }

  signupAdmin(user: any, img: File) {
    let formData = new FormData();
    formData.append("firstName", user.firstName);
    formData.append("lastName", user.lastName);
    formData.append("email", user.email);
    formData.append("tel", user.tel);
    formData.append("pwd", user.pwd);
    formData.append("role", user.role);
    formData.append("avatar", img);
    return this.http.post<{ msg: string }>(this.userURL + "/signupAdmin", formData);
  }

  login(user) {
    return this.http.post<{ msg: string, user: any }>(this.userURL + "/login", user);
  }

  getTeachers() {
    return this.http.get<{ docs: any, msg: string }>(this.userURL + "/teachers");
  }

  confirmTeacher(id) {
    return this.http.get<{ msg: string }>(`${this.userURL}/confirmTeacher/${id}`);
  }

  deleteUser(id) {
    return this.http.delete<{ msg: string }>(`${this.userURL}/${id}`);
  }

  getStudents() {
    return this.http.get<{ docs: any, msg: string }>(this.userURL + "/students");
  }

  getParents() {
    return this.http.get<{ docs: any, msg: string }>(this.userURL + "/parents");
  }

  getUserById(id) {
    return this.http.get<{ user: any }>(`${this.userURL}/${id}`);
  }

  assignStudentToCourse(obj) {
    return this.http.post<{ msg: string }>(this.userURL, obj);
  }

  getAffectedStudentsByCourseId(id) {
    return this.http.get<{ students: any, msg: string }>(`${this.userURL}` + "/affectedSrudents/" + `${id}`);
  }

  studentEvaluation(evalObj) {
    return this.http.post<{msg: string}>(`${this.userURL}/evaluation`, evalObj);
  }

  getStudentEval(x,y) {
    return this.http.get<{eval: any}>(`${this.userURL}/stEval/${x}/${y}`);
  }
}
