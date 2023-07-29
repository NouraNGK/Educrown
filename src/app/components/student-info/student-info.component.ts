import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AffectationService } from 'src/app/services/affectation.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-student-info',
  templateUrl: './student-info.component.html',
  styleUrls: ['./student-info.component.css']
})
export class StudentInfoComponent implements OnInit {

  word: string = "Welcome to your child space";
  constructor(private activatedRoute: ActivatedRoute,
    private userService: UserService,
    private router: Router,
    private affectationService: AffectationService) { }

  ngOnInit() {
    let idStudent = this.activatedRoute.snapshot.paramMap.get("studentId");
    console.log("here is the child ID from URL:", idStudent);
    this.affectationService.getStudentCourses(idStudent).subscribe((response) => {
      if (response.msg == "0") {
        
      } else {
        
      }
    });
  }

}
