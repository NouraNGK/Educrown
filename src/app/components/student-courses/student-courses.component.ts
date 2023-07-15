import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import jwt_decode from 'jwt-decode';
import { CourseService } from 'src/app/services/course.service';

@Component({
  selector: 'app-student-courses',
  templateUrl: './student-courses.component.html',
  styleUrls: ['./student-courses.component.css']
})
export class StudentCoursesComponent implements OnInit {

  word: string = "my courses"
  decodedToken: any;
  courses: any;
  constructor(private courseService: CourseService,
    private router: Router) { }

  ngOnInit() {
    this.decodedToken = this.decodeToken(sessionStorage.getItem("jwt"));
    console.log("Here is teacher decodedToken", this.decodedToken);
    this.courseService.getCoursesByIdStudent(this.decodedToken.userId).subscribe(
      (response) => {
        console.log("Here is response from BE side:", response.findedCourses);
        this.courses = response.findedCourses;
      });
  }

  decodeToken(token: string) {
    return jwt_decode(token);
  }

  courseDetailsRoute(id) {
    this.router.navigate([`studentCourseInfo/${id}`]);
  }

}
