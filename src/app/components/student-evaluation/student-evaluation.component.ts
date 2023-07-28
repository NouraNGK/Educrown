import jwt_decode from 'jwt-decode';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { EvaluationService } from 'src/app/services/evaluation.service';

@Component({
  selector: 'app-student-evaluation',
  templateUrl: './student-evaluation.component.html',
  styleUrls: ['./student-evaluation.component.css']
})
export class StudentEvaluationComponent implements OnInit {

  word: string = "evaluation";
  evaluationForm: FormGroup;
  decodedToken: any;
  constructor(private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private userService: UserService,
    private evaluationService: EvaluationService,
    private router: Router) { }

  ngOnInit() {
    this.evaluationForm = this.fb.group({
      note: ["", [Validators.required, Validators.min(0), Validators.max(20)]],
      comment: ["", [Validators.required, Validators.maxLength(45)]]
    });
  }

  addEvaluation() {
    this.decodedToken = this.decodeToken(sessionStorage.getItem("jwt"));
    let idSelectedTeacher = this.decodedToken.userId;
    let idSelectedCourse = this.activatedRoute.snapshot.paramMap.get("x");
    let idSelectedStudent = this.activatedRoute.snapshot.paramMap.get("y");
    this.evaluationForm.value.teacherId = idSelectedTeacher;
    this.evaluationForm.value.courseId = idSelectedCourse;
    this.evaluationForm.value.studentId = idSelectedStudent;
    this.evaluationService.studentEvaluation(this.evaluationForm.value).subscribe(
      (response) => {
        console.log("Here is response from adding evaluation BL:", response.msg);
        this.router.navigate(["myCourses"]);
      });
  }

  decodeToken(token: string) {
    return jwt_decode(token);
  }
}
