import { Component, Input, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit {

  @Input() 
  courseInput: any;

  teacherAvatar: any;
  teacherName: string;
  teacherLastName: string;
  constructor(private userService: UserService) { }

  ngOnInit() {
    if (this.courseInput && this.courseInput.idTeacher) {
      let teacherId = this.courseInput.idTeacher;
      this.userService.getUserById(teacherId).subscribe(
        (response)  => {
          this.teacherAvatar = response.user.avatar;
          this.teacherName = response.user.firstName;
          this.teacherLastName = response.user.lastName;
        });
    }
  }


}
