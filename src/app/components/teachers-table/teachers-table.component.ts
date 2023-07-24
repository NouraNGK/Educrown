import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-teachers-table',
  templateUrl: './teachers-table.component.html',
  styleUrls: ['./teachers-table.component.css']
})
export class TeachersTableComponent implements OnInit {

  teachers: any;
  sanitizedPDFUrl: any;
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
    // localStorage.setItem("id", id);
    this.router.navigate([`userInfo/${id}`]);
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


  displayCv(id) {
    this.userService.getUserById(id).subscribe(
      (response) => {
        console.log("Here is the BL response:", response.user);
        let pdfUrlFromDatabase = response.user.cv;
        Swal.fire({
          html: `
            <embed src="${pdfUrlFromDatabase}" type="application/pdf" width="100%" height="500px" />
          `,
          showCancelButton: true,
          confirmButtonText: 'Close',
          cancelButtonText: 'Cancel',
          showCloseButton: true
        });

        // Other solutions
        // **
        // window.location.href = pdfUrlFromDatabase;
        // **
        // Swal.fire({
        //   imageUrl: pdfUrlFromDatabase,
        //   imageAlt: 'PDF Preview',
        //   width: '80%',
        //   showCancelButton: true,
        //   confirmButtonText: 'Open PDF',
        //   cancelButtonText: 'Cancel'
        // })
        // .then((result) => {
        //   if (result.isConfirmed) {
        //     Handle opening the PDF, e.g., open in a new tab or redirect to a PDF viewer page
        //     window.open(pdfUrlFromDatabase, '_blank');
        //   }
        // });
      });
  }


}
