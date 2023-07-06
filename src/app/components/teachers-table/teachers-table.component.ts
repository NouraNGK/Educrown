import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-teachers-table',
  templateUrl: './teachers-table.component.html',
  styleUrls: ['./teachers-table.component.css']
})
export class TeachersTableComponent implements OnInit {

  teachers: any;
  constructor(private userService: UserService,
    private router: Router) { }

  ngOnInit() {
    this.getAllTeachers();
  }

  confirmTeacher(id) {
    console.log("Here is id of the teacher to update", id);
    this.userService.confirmTeacher(id).subscribe(
      (response) => {
        if (response.msg == "1") {
          this.getAllTeachers();
        }
      });
  }

  goToInfo(id) {
    localStorage.setItem("id", id);
    this.router.navigate(["userInfo"]);
  }
  

  deleteTeacher(id) {
    this.userService.deleteUser(id).subscribe(
      (response) => {
        if (response.msg == "1") {
          this.getAllTeachers();
        }
      });
  }


  getAllTeachers() {
    this.userService.getTeachers().subscribe(
      (response) => {
        console.log("Here is the users table except the teachers on hold", response.docs);
        this.teachers = response.docs;
      });
  }

}
