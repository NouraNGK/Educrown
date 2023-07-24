import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-signup-admin',
  templateUrl: './signup-admin.component.html',
  styleUrls: ['./signup-admin.component.css']
})
export class SignupAdminComponent implements OnInit {

  signupForm: FormGroup;
  imagePreview: string;
  errorMsg: string;
  constructor(private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router) { }

  ngOnInit() {
    this.signupForm = this.formBuilder.group({
      firstName: ["", [Validators.required, Validators.minLength(3)]],
      lastName: ["", [Validators.required, Validators.minLength(5)]],
      email: ["", [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      tel: ["", [Validators.required, Validators.pattern("^[0-9]*$"),
      Validators.minLength(8), Validators.maxLength(8)]],
      pwd: ["", [Validators.required,
      Validators.pattern("^[a-zA-Z0-9!@#$%^&*]{6,12}$")]],
      avatar: ["", [Validators.required, this.avatarTypeValidator(['png', 'jpg', 'jpeg'])]]
    });
  }

  onImageSelected(event: Event) {
    const fileInput = event.target as HTMLInputElement;
    const files = fileInput.files;
  
    if (files && files.length > 0) {
      const file = files[0];
      const avatarControl = this.signupForm.get('avatar');
  
      if (avatarControl) {
        avatarControl.patchValue(file);
        avatarControl.markAsTouched();
        avatarControl.updateValueAndValidity();
      }
  
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  avatarTypeValidator(allowedTypes: string[]): ValidatorFn {
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

  signUp() {
    console.log("Here is the object", this.signupForm.value);
    this.signupForm.value.role = "admin";
    this.userService.signupAdmin(this.signupForm.value, this.signupForm.value.avatar).subscribe(
      (response) => {
        // console.log("Here response after signup", response.msg);
        if (response.msg == "3") {
          this.router.navigate(["signin"]);
        } else if (response.msg == "2") {
          this.errorMsg = "Email exists";
        } else if (response.msg == "1") {
          this.errorMsg = "Phone number exists";
        } else if (response.msg == "0") {
          this.errorMsg = "Email and Phone number exist";
        }
      })
  }

}
