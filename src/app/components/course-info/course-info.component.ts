import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CourseService } from 'src/app/services/course.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-course-info',
  templateUrl: './course-info.component.html',
  styleUrls: ['./course-info.component.css']
})
export class CourseInfoComponent implements OnInit {

  word: string = "course info";
  idChosenCourse: any;
  selectedCourse: any;
  affectedStudentTable: any;
  constructor(private activatedRoute: ActivatedRoute,
    private courseService: CourseService,
    private userService: UserService) { }

  ngOnInit() {
    this.idChosenCourse = this.activatedRoute.snapshot.paramMap.get("id");
    this.courseService.getCourseById(this.idChosenCourse).subscribe(
      (response) => {
        console.log("Here is the chosen course:", response.course);
        this.selectedCourse = response.course;
      });
    this.userService.getAffectedStudentsByCourseId(this.idChosenCourse).subscribe(
      (response) => {
        if (response.students.length !== 0) {
          console.log("Here are the affected students", response.students);
          this.affectedStudentTable = response.students;
        } else {
          console.log("No student is assigned to this course");
        }
      });
  }

}
