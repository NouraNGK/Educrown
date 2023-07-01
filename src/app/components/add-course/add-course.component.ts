import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.css']
})
export class AddCourseComponent implements OnInit {

  word: string = "add course";
  courseForm: FormGroup;
  imagePreview : string;
  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.courseForm = this.formBuilder.group({
      name: ["", [Validators.required, Validators.minLength(4)]],
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

  addCourse(){
    console.log("Here is the object", this.courseForm.value);
  }

}
