import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CourseService } from 'src/app/services/course.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-assignment-details',
  templateUrl: './assignment-details.component.html',
  styleUrls: ['./assignment-details.component.css']
})
export class AssignmentDetailsComponent implements OnInit {

  word: string = "assignment details";
  courseId: any;
  selectedCourse: any;
  students: any;
  selectedStudentId: string;
  constructor(private courseService: CourseService,
    private userService: UserService,
    private router: Router) { }

  ngOnInit() {
    this.courseId = localStorage.getItem("selectedCourseId");
    this.courseService.getCourseById(this.courseId).subscribe(
      (response) => {
        this.selectedCourse = response.course;
      });
    this.userService.getStudents().subscribe(
      (response) => {
        this.students = response.docs;
      });
  }

  onStudentSelection(studentId: string) {
    this.selectedStudentId = studentId;
    console.log("Here is the selected student ID:", this.selectedStudentId);
  }

  assign() {
    let affectationObj = {
      courseId: this.courseId,
      studentId: this.selectedStudentId
    }
    this.userService.assignStudentToCourse(affectationObj).subscribe(
      (response) => {
        console.log("Here is response from BE:", response.msg);
        if (response.msg == "1") {
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'The student is assigned to the course with success',
            showConfirmButton: false,
            timer: 3000
          });
          this.router.navigate(["assignment"]);
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'The student is already assigned to this course'
          })
        }
      });
  }

}
