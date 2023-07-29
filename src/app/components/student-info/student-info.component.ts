import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AffectationService } from 'src/app/services/affectation.service';
import { EvaluationService } from 'src/app/services/evaluation.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-student-info',
  templateUrl: './student-info.component.html',
  styleUrls: ['./student-info.component.css']
})
export class StudentInfoComponent implements OnInit {

  word: string = "Welcome to your child space";
  noCoursesFound: boolean;
  courses: any;
  idStudent: string;


  constructor(private activatedRoute: ActivatedRoute,
    private affectationService: AffectationService,
    private evaluationService: EvaluationService) { }

  ngOnInit() {
    this.idStudent = this.activatedRoute.snapshot.paramMap.get("studentId");
    console.log("here is the child ID from URL:", this.idStudent);
    this.affectationService.getStudentCourses(this.idStudent).subscribe((response) => {
      console.log("here is the student courses:", response.courses);
      if (response.courses.length === 0) {
        this.noCoursesFound = true;
      } else {
        this.noCoursesFound = false;
        this.courses = response.courses;
      }
    });
  }

  getCourseEvaluation(courseId) {
    this.evaluationService.getStudentEval(this.idStudent, courseId).subscribe((response) => {
      console.log("here is student:", this.idStudent,"course evaluation:", response.eval);
      let studentEvaluation = response.eval;
      if (studentEvaluation.length == 0) {
        Swal.fire({
          icon: 'info',
          title: 'No Grades',
          text: 'Your child does not have any grades in this course yet.',
          confirmButtonText: 'OK'
        });
      } else {
        Swal.fire({
          title: 'Grade and Evaluation',
          html: `<p>Grade: ${studentEvaluation[0].note}</p><p>Evaluation: ${studentEvaluation[0].comment}</p>`,
          confirmButtonText: 'OK',
          customClass: {
            container: 'swal-modal', // Apply the custom class to the modal
            confirmButton: 'swal-button--confirm' // Apply the custom class to the "OK" button
          }
        });
      }
    });
  }

}
