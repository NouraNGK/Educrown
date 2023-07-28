import { CourseService } from 'src/app/services/course.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-assignment',
  templateUrl: './assignment.component.html',
  styleUrls: ['./assignment.component.css']
})
export class AssignmentComponent implements OnInit {

  word: string = "assignment";
  courses: any;
  constructor(private courseService: CourseService,
    private router: Router) { }

  ngOnInit() {
    this.courseService.getAllCourses().subscribe(
      (response) => {
        console.log("Here is all courses from BE", response.allCourses);
        this.courses = response.allCourses;
      }
    )
  }

  affectationRoute(id) {
    this.router.navigate([`assignmentDetails/${id}`]);
    // localStorage.setItem("selectedCourseId", id);
  }

}
