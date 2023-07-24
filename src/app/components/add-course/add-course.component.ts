import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CourseService } from 'src/app/services/course.service';
import Swal from 'sweetalert2';
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.css']
})
export class AddCourseComponent implements OnInit {

  title: string = "add course";
  courseForm: FormGroup;
  imagePreview: string;
  msg: any;
  id: any;
  course: any;

  constructor(private formBuilder: FormBuilder,
    private courseService: CourseService,
    private router: Router,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.courseForm = this.formBuilder.group({
      courseName: ["", [Validators.required]],
      duration: ["", [Validators.required, Validators.min(1)]],
      sessionsNbr: ["", [Validators.required, Validators.min(1)]],
      sessionDuration: ["", [Validators.required]],
      studentsNbr: ["", [Validators.required, Validators.min(1)]],
      price: ["", [Validators.required, Validators.min(300)]],
      description: ["", [Validators.required, Validators.maxLength(80)]],
      img: ["", [Validators.required, this.imgTypeValidator(['png', 'jpg', 'jpeg'])]]
    });

    this.id = this.activatedRoute.snapshot.paramMap.get("id");
    if (this.id) {
      // alert("Here into Edit");
      this.title = "edit course";
      this.courseService.getCourseById(this.id).subscribe(
        (response) => {
          this.course = response.course;
          this.courseForm.patchValue({
            courseName: this.course.courseName,
            duration: this.course.duration,
            sessionsNbr: this.course.sessionsNbr,
            sessionDuration: this.course.sessionDuration,
            studentsNbr: this.course.studentsNbr,
            price: this.course.price,
            description: this.course.description
          });
        });
    }
  }

  onImageSelected(event: Event) {
    const fileInput = event.target as HTMLInputElement;
    const files = fileInput.files;

    if (files && files.length > 0) {
      const file = files[0];
      const imgControl = this.courseForm.get('img');

      if (imgControl) {
        imgControl.patchValue(file);
        imgControl.markAsTouched();
        imgControl.updateValueAndValidity();
      }

      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  imgTypeValidator(allowedTypes: string[]): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      if (control.value instanceof File) {
        const file = control.value as File;
        const extension = file.name.split('.').pop();
        if (extension) {
          const lowerCaseExtension = extension.toLowerCase();
          if (allowedTypes.indexOf(lowerCaseExtension) === -1) {
            return { invalidFileType: true };
          }
        }
      }

      return null;
    };
  }

  validate() {
    if (this.id) {
      // console.log("here is the new course to send", this.courseForm.value);
      // console.log("here is the new image to send", this.courseForm.value.img);
      this.courseService.editCourse(this.id, this.courseForm.value, this.courseForm.value.img).subscribe(
        (response) => {
          console.log("here is response after editing course", response.msg);
          if (response.msg === "Edited With Success") {
            Swal.fire({
              icon: 'success',
              title: 'Course Edited Successfully!',
              text: 'Your course has been successfully edited.',
              timer: 5000, 
              showConfirmButton: false
            });
          this.router.navigate(["myCourses"]);
          } else {
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'Failed to edit the course. Please try again later.',
              timer: 5000, 
              showConfirmButton: false
            });
          }
        });
    } else {
      let decodedToken: any = this.decodeToken(sessionStorage.getItem("jwt"));
      this.courseForm.value.idTeacher = decodedToken.userId;
      console.log("Here is the new courseForm", this.courseForm.value);
      this.courseService.addCourse(this.courseForm.value, this.courseForm.value.img).subscribe(
        (response) => {
          console.log("Here is BE response,", response.msg);
          if (response.msg == "ok") {
            this.msg = Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'Your course has been saved',
              showConfirmButton: false,
              timer: 3000
            });
            // I just put the home path as a test, I should replace it later by the course page
            this.router.navigate([""]);
          }
        });
    }
  }

  decodeToken(token: string) {
    return jwt_decode(token);
  }

}
