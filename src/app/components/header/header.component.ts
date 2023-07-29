import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';
import jwt_decode from 'jwt-decode';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  searchForm: FormGroup;
  student: any = {};
  constructor(private userService: UserService,
    private router: Router) { }

  ngOnInit() {
  }

  search() {
    let decodedToken: any = this.decodeToken(sessionStorage.getItem("jwt"));
    let parentId = decodedToken.userId;
    this.userService.getUserById(parentId).subscribe((response) => {
      if (response.user.childNbr == this.student.phoneNbr) {
        this.userService.getUserByNbr(this.student.phoneNbr).subscribe((response) => {
          let studentId = response.student._id;
          console.log("here is the student id from BE", studentId);
          this.router.navigate([`studentInfo/${studentId}`]);
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'No Student Found',
          text: 'This is not your child phone number.',
          confirmButtonText: 'OK'
        });
      }
    })



  }

  decodeToken(token: string) {
    return jwt_decode(token);
  }

}
