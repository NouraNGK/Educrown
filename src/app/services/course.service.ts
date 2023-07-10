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
    formData.append("teacherFirstName", course.teacherFirstName);
    formData.append("teacherLastName", course.teacherLastName);
    return this.http.post<{ msg: string }>(this.courseURL, formData);
  }

  getAllCourses() {
    return this.http.get<{allCourses: any}>(this.courseURL);
  }

  deleteCourse(id) {
    return this.http.delete<{msg: string}>(`${this.courseURL}/${id}`);
  }

}
