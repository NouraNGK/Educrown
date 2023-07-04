import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CourseService } from 'src/app/services/course.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.css']
})
export class AddCourseComponent implements OnInit {

  word: string = "add course";
  courseForm: FormGroup;
  imagePreview: string;
  msg: any;
  constructor(private formBuilder: FormBuilder,
    private courseService: CourseService,
    private router: Router) { }

  ngOnInit() {
    this.courseForm = this.formBuilder.group({
      courseName: ["", [Validators.required, Validators.minLength(4)]],
      duration: ["", [Validators.required, Validators.min(1)]],
      sessionsNbr: ["", [Validators.required, Validators.min(1)]],
      sessionDuration: ["", [Validators.required]],
      description: ["", [Validators.required, Validators.maxLength(150)]],
      img: ["", [Validators.required]]
    });
  }

  onImageSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    console.log("Here selected file", file);
    this.courseForm.patchValue({ img: file });
    this.courseForm.updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string
    };
    reader.readAsDataURL(file);
  }

  addCourse() {
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
