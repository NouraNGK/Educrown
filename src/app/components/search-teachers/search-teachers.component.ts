import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-search-teachers',
  templateUrl: './search-teachers.component.html',
  styleUrls: ['./search-teachers.component.css']
})
export class SearchTeachersComponent implements OnInit {

  word: string = "search teachers";
  searchForm: FormGroup;
  teacher:any={};
  foundedTeachers: any;
  constructor(private userService: UserService) { }

  ngOnInit() {
  }

  searchTeachers(){
    console.log("Here is the object", this.teacher);
    this.userService.getTeachersBySpecialty(this.teacher).subscribe(
      (response) => {
        console.log("here is response from BE:", response.msg);
        console.log("here is response from BE:", response.teachers);
        if (response.msg == "1") {
          this.foundedTeachers = response.teachers;
        } else {
          Swal.fire({
            icon: 'info',
            title: 'No Teachers Found',
            text: 'Sorry, no teachers were found with the requested specialty.',
          });
        }
      });
  }
}
