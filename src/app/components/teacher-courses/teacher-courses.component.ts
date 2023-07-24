import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import jwt_decode from 'jwt-decode';
import { CourseService } from 'src/app/services/course.service';
import Swal from 'sweetalert2';


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
    this.getTeachersCourses();
  }

  decodeToken(token: string) {
    return jwt_decode(token);
  }

  courseDetailsRoute(id) {
    this.router.navigate([`courseInfo/${id}`]);
  }

  goToEdit(id) {
    this.router.navigate([`editCourse/${id}`]);
  }

  deleteCourse(id) {
    this.courseService.deleteCourse(id).subscribe(
      (response) => {
        console.log("here is BE answer after deletong course:", response.msg);
        if (response.msg == "1") {
          Swal.fire({
            icon: 'success',
            title: 'Course Deleted!',
            text: 'The course has been deleted with success.',
            confirmButtonColor: '#1363DF',
            timer: 4000,
            timerProgressBar: true,
            toast: true,
            position: 'top-right',
            showConfirmButton: false
          });
          this.getTeachersCourses();
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Error Deleting Course',
            text: 'There was an error while deleting the course. Please try again later.',
            confirmButtonColor: '#1363DF',
            timer: 4000,
            timerProgressBar: true,
            toast: true,
            position: 'top-right',
            showConfirmButton: false
          });
        }
      })
  }

  getTeachersCourses() {
    this.decodedToken = this.decodeToken(sessionStorage.getItem("jwt"));
    console.log("Here is teacher decodedToken", this.decodedToken);
    this.courseService.getCoursesByIdUser(this.decodedToken.userId).subscribe(
      (response) => {
        console.log("Here is response from BE side:", response.findedCourses);
        this.courses = response.findedCourses;
      });
  }
}
