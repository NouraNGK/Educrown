import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { CourseService } from 'src/app/services/course.service';
import { UserService } from 'src/app/services/user.service';
import jwt_decode from 'jwt-decode';
import Swal from 'sweetalert2'
import { EvaluationService } from 'src/app/services/evaluation.service';

@Component({
  selector: 'app-student-course-info',
  templateUrl: './student-course-info.component.html',
  styleUrls: ['./student-course-info.component.css']
})
export class StudentCourseInfoComponent implements OnInit {

  word: string = "my course info and evaluation";
  selectedCourse: any;
  decodedToken: any;
  stEvaluation: any;
  constructor(private activatedRoute: ActivatedRoute,
    private courseService: CourseService,
    private userService: UserService,
    private evaluationService: EvaluationService) { }

  ngOnInit() {
    let stCourseId = this.activatedRoute.snapshot.paramMap.get("id");
    this.courseService.getCourseById(stCourseId).subscribe(
      (response) => {
        this.selectedCourse = response.course;
      });
    this.decodedToken = this.decodeToken(sessionStorage.getItem("jwt"));
    console.log("Here is teacher decodedToken", this.decodedToken);
    this.evaluationService.getStudentEval(this.decodedToken.userId, stCourseId).subscribe(
      (response) => {
        console.log("Here is the evaluation received from the BL:", response.eval);
          this.stEvaluation = response.eval;
      });
  }

  decodeToken(token: string) {
    return jwt_decode(token);
  }

}
