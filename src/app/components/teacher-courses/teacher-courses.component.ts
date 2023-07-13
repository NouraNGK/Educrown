import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import jwt_decode from 'jwt-decode';
import { CourseService } from 'src/app/services/course.service';


@Component({
  selector: 'app-teacher-courses',
  templateUrl: './teacher-courses.component.html',
  styleUrls: ['./teacher-courses.component.css']
})
export class TeacherCoursesComponent implements OnInit {

  word: string = "my courses";
  decodedToken: any;
  courses: any;
  constructor(private courseService: CourseService,
    private router: Router) { }

  ngOnInit() {
    this.decodedToken = this.decodeToken(sessionStorage.getItem("jwt"));
    console.log("Here is teacher decodedToken", this.decodedToken);
    this.courseService.getCoursesByIdUser(this.decodedToken.userId).subscribe(
      (response) => {
        console.log("Here is response from BE side:", response.findedCourses);
        this.courses = response.findedCourses;
      });
  }

  decodeToken(token: string) {
    return jwt_decode(token);
  }

  courseDetailsRoute(id) {
    this.router.navigate([`courseDetails/${id}`]);
  }

}
