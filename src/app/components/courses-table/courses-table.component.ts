import { Component, OnInit } from '@angular/core';
import { CourseService } from 'src/app/services/course.service';

@Component({
  selector: 'app-courses-table',
  templateUrl: './courses-table.component.html',
  styleUrls: ['./courses-table.component.css']
})
export class CoursesTableComponent implements OnInit {

  courses: any;
  constructor(private courseService: CourseService) { }

  ngOnInit() {
    this.getAllCourses();
  }

  deleteCourse(id) {
    this.courseService.deleteCourse(id).subscribe(
      (response) => {
        if (response.msg == "1") {
          this.getAllCourses();
        }
      });
  }

  getAllCourses(){
    this.courseService.getAllCourses().subscribe(
      (response) => {
        this.courses = response.allCourses;
      }
    )
  }
}
