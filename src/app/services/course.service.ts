import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  courseURL: string = "http://localhost:3000/api/courses";
  constructor(private http: HttpClient) { }

  addCourse(course: any, avatar: File) {
    let formData = new FormData();
    formData.append("courseName", course.courseName);
    formData.append("duration", course.duration);
    formData.append("sessionsNbr", course.sessionsNbr);
    formData.append("sessionDuration", course.sessionDuration);
    formData.append("studentsNbr", course.studentsNbr);
    formData.append("price", course.price);
    formData.append("description", course.description);
    formData.append("img", avatar);
    formData.append("idTeacher", course.idTeacher);
    return this.http.post<{ msg: string }>(this.courseURL, formData);
  }

  getAllCourses() {
    return this.http.get<{allCourses: any}>(this.courseURL);
  }

  deleteCourse(id) {
    return this.http.delete<{msg: string}>(`${this.courseURL}/${id}`);
  }

  getCourseById(id) {
    return this.http.get<{course: any}>(`${this.courseURL}/${id}`);
  }

  getCoursesByIdUser(id) {
    return this.http.get<{findedCourses: any}>(`${this.courseURL}/myCourses/${id}`);
  }

  getCoursesByIdStudent(id) {
    return this.http.get<{findedCourses: any, msg: string}>(`${this.courseURL}/stCourses/${id}`);
  }

  editCourse(id: string, newObject: any, img: File) {
    let formData = new FormData();
    formData.append("courseName", newObject.courseName);
    formData.append("duration", newObject.duration);
    formData.append("sessionsNbr", newObject.sessionsNbr);
    formData.append("sessionDuration", newObject.sessionDuration);
    formData.append("studentsNbr", newObject.studentsNbr);
    formData.append("price", newObject.price);
    formData.append("description", newObject.description);
    formData.append("img", img);
    return this.http.put<{msg: string}>(`${this.courseURL}/editCourse/${id}`, formData);
  }

}
