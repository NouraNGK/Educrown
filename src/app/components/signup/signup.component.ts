import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signupForm: FormGroup;
  imagePreview: string;
  cvName: string;
  word: string = "subscription";
  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.signupForm = this.formBuilder.group({
      firstName: ["", [Validators.required, Validators.minLength(3)]],
      lastName: ["", [Validators.required, Validators.minLength(5)]],
      email: ["", [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      tel: ["", [Validators.required, Validators.pattern("^[0-9]*$"),
      Validators.minLength(8), Validators.maxLength(8)]],
      address: ["", [Validators.required, Validators.maxLength(25)]],
      pwd: ["", [Validators.required,
      Validators.pattern("^[a-zA-Z0-9!@#$%^&*]{6,12}$")]],
      role: ["", [Validators.required]],
      specialty: ["", [Validators.required]],
      cv: [""],
      avatar: [""],
      childNbr: ["", [Validators.required, Validators.pattern("^[0-9]*$"),
      Validators.minLength(8), Validators.maxLength(8)]]
    });
  }

  onImageSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    // console.log("Here selected file", file);
    this.signupForm.patchValue({ avatar: file });
    this.signupForm.updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string
    };
    reader.readAsDataURL(file);
  }

  onCvSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    console.log("Here selected file", file);
    this.signupForm.patchValue({ cv: file });
    this.signupForm.updateValueAndValidity();
    this.cvName = this.signupForm.value.cv.name;
    // ou bien this.cvName = file.name;
  }

  disabledButton() {
    let obj = this.signupForm.value;
    if (obj.firstName != "" && obj.lastName != "" && obj.email != ""
      && obj.tel != "" && obj.address != "" && obj.pwd != "" 
      && obj.role == "teacher" && obj.specialty != "" && obj.cv != ""
      && obj.avatar == "" && obj.childNbr == "") {
      return false;
    } else if (obj.firstName != "" && obj.lastName != "" && obj.email != ""
      && obj.tel != "" && obj.address != "" && obj.pwd != ""
      && obj.role == "student" && obj.avatar != "" && obj.specialty == ""
      && obj.cv == "" && obj.childNbr == "") {
      return false;
    } else if (obj.firstName != "" && obj.lastName != "" && obj.email != "" 
    && obj.tel != "" && obj.address != "" && obj.pwd != ""
      && obj.role == "parent" && obj.childNbr != "" && obj.specialty == "" 
      && obj.cv == "" && obj.avatar == "") {
      return false;
    }
    return true;
  }

  signup() {
    console.log("Here is the object", this.signupForm.value);
  }
  
}

  // isSignupFormInvalid() {
  //   if (this.signupForm.value.role === "teacher") {
  //     if (this.signupForm.value.avatar == "" && this.signupForm.value.childNbr == "") {
  //       return false;
  //     }
  //   } else if (this.signupForm.value.role === "student") {
  //     if (this.signupForm.value.specialty == "" && this.signupForm.value.cv == "" && this.signupForm.value.childNbr == "") {
  //       return false;
  //     }
  //   } else if (this.signupForm.value.role === "parent") {
  //     if (this.signupForm.value.specialty == "" && this.signupForm.value.cv == "" && this.signupForm.value.avatar == "") {
  //       return false;
  //     }
  //   }
  //   return true;
  // }

