import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-students-table',
  templateUrl: './students-table.component.html',
  styleUrls: ['./students-table.component.css']
})
export class StudentsTableComponent implements OnInit {

  students: any;
  constructor(private userService: UserService) { }

  ngOnInit() {
    this.getAllStudents();
  }

  goToInfo(id) {

  }

  deleteStudent(id) {
    this.userService.deleteUser(id).subscribe((response)=>{
      if (response.msg == "1") {
        this.getAllStudents();
      }
    });
  }

  getAllStudents() {
    this.userService.getStudents().subscribe(
      (response) => {
        this.students = response.docs;
      });
  }
}
