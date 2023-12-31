import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  teacherForm: FormGroup;
  studentForm: FormGroup;
  parentForm: FormGroup;
  imagePreview: string;
  cvName: string;
  word: string = "subscription";
  path: any;
  errorMsg: any;
  sanitizedPDFUrl: any;
  constructor(private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router,
    private sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.path = this.router.url;

    this.teacherForm = this.formBuilder.group({
      firstName: ["", [Validators.required, Validators.minLength(3)]],
      lastName: ["", [Validators.required, Validators.minLength(5)]],
      email: ["", [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      tel: ["", [Validators.required, Validators.pattern("^[0-9]*$"),
      Validators.minLength(8), Validators.maxLength(8)]],
      address: ["", [Validators.required, Validators.maxLength(25)]],
      pwd: ["", [Validators.required,
      Validators.pattern("^[a-zA-Z0-9!@#$%^&*]{6,12}$")]],
      specialty: ["", [Validators.required]],
      avatar: ["", [Validators.required, this.validateAvatarFileType]],
      cv: ["", [Validators.required, this.validateCvFileType]]
    });

    this.studentForm = this.formBuilder.group({
      firstName: ["", [Validators.required, Validators.minLength(3)]],
      lastName: ["", [Validators.required, Validators.minLength(5)]],
      email: ["", [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      tel: ["", [Validators.required, Validators.pattern("^[0-9]*$"),
      Validators.minLength(8), Validators.maxLength(8)]],
      address: ["", [Validators.required, Validators.maxLength(25)]],
      pwd: ["", [Validators.required,
      Validators.pattern("^[a-zA-Z0-9!@#$%^&*]{6,12}$")]],
      avatar: ["", [Validators.required, this.validateAvatarFileType]]
    });

    this.parentForm = this.formBuilder.group({
      firstName: ["", [Validators.required, Validators.minLength(3)]],
      lastName: ["", [Validators.required, Validators.minLength(5)]],
      email: ["", [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      tel: ["", [Validators.required, Validators.pattern("^[0-9]*$"),
      Validators.minLength(8), Validators.maxLength(8)]],
      address: ["", [Validators.required, Validators.maxLength(25)]],
      pwd: ["", [Validators.required,
      Validators.pattern("^[a-zA-Z0-9!@#$%^&*]{6,12}$")]],
      childNbr: ["", [Validators.required, Validators.pattern("^[0-9]*$"),
      Validators.minLength(8), Validators.maxLength(8)]]
    });
  }

  onImageSelected(event: Event) {
    const fileInput = event.target as HTMLInputElement;
    const files = fileInput.files;
    let file: File | null = null;

    if (files && files.length > 0) {
      file = files[0];
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = () => {
          this.imagePreview = reader.result as string;
        };
        reader.readAsDataURL(file);
      }
    }
    if (this.path === '/subscriptionTe') {
      if (file) {
        this.teacherForm.patchValue({ avatar: file });
        this.teacherForm.updateValueAndValidity();
      }
    } else if (this.path === '/subscriptionSt') {
      if (file) {
        this.studentForm.patchValue({ avatar: file });
        this.studentForm.updateValueAndValidity();
      }
    }
  }

  // onImageSelected(event: Event) {
  //   const file = (event.target as HTMLInputElement).files[0];
  //   console.log("Here selected file", file);

  //   if (this.path === "/subscriptionTe") {
  //   this.teacherForm.patchValue({ avatar: file });
  //   this.teacherForm.updateValueAndValidity();
  //   } else if (this.path === "/subscriptionSt") {
  //   this.studentForm.patchValue({ avatar: file });
  //   this.studentForm.updateValueAndValidity();
  //   }

  //   const reader = new FileReader();
  //   reader.onload = () => {
  //     this.imagePreview = reader.result as string
  //   };
  //   reader.readAsDataURL(file);
  // }

  onFileSelected(event: Event) {
    const fileInput = event.target as HTMLInputElement;
    const files = fileInput.files;

    if (files && files.length > 0) {
      const file = files[0];

      if (file.type === 'application/pdf') {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          const pdfUrl: string = e.target.result;
          this.sanitizedPDFUrl = this.sanitizePdfUrl(pdfUrl);
        };
        reader.readAsDataURL(file);

        this.teacherForm.patchValue({ cv: file });
        this.teacherForm.updateValueAndValidity();
      }
    }
  }

  // onFileSelected(event: Event) {
  //   const file = (event.target as HTMLInputElement).files[0];
  //   console.log("Here selected CV", file);
  //   this.teacherForm.patchValue({ cv: file });
  //   this.teacherForm.updateValueAndValidity();
  //   if (file && file.type === 'application/pdf') {
  //     const reader = new FileReader();
  //     reader.onload = (e: any) => {
  //       const pdfUrl: string = e.target.result;
  //       this.sanitizedPDFUrl = this.sanitizePdfUrl(pdfUrl);
  //     };
  //     reader.readAsDataURL(file);
  //   }
  // }

  sanitizePdfUrl(pdfUrl: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(pdfUrl);
  }

  // fileTypeValidator(allowedTypes: string[]): ValidatorFn {
  //   return (control: AbstractControl): { [key: string]: any } | null => {
  //     if (control.value instanceof File) {
  //       const file = control.value as File;
  //       const extension = file.name.split('.').pop();
  //       const lowerCaseExtension = extension ? extension.toLowerCase() : null;
  
  //       console.log("File extension:", lowerCaseExtension);
  
  //       if (lowerCaseExtension && allowedTypes.indexOf(lowerCaseExtension) === -1) {
  //         return { invalidFileType: true };
  //       }
  //     }
  //     return null;
  //   };
  // }
  
  // Function to validate CV file type
validateCvFileType(control: AbstractControl): { [key: string]: any } | null {
  if (control.value instanceof File) {
    const file = control.value as File;
    if (file.type !== 'application/pdf') {
      return { invalidCvFileType: true };
    }
  }
  return null;
}

// Function to validate avatar file type
validateAvatarFileType(control: AbstractControl): { [key: string]: any } | null {
  if (control.value instanceof File) {
    const file = control.value as File;
    const allowedExtensionsRegex = new RegExp(`\\.(${['png', 'jpg', 'jpeg'].join('|')})$`, 'i');
    if (!allowedExtensionsRegex.test(file.name)) {
      return { invalidAvatarFileType: true };
    }
  }
  return null;
}

  signup() {
    if (this.path === "/subscriptionTe") {
      console.log("Here is the object", this.teacherForm.value);
      this.teacherForm.value.role = "teacher";
      this.teacherForm.value.status = "on hold";
      console.log("Here is the selected cv", this.teacherForm.value.cv);
      console.log("Here is the selected avatar", this.teacherForm.value.avatar);
      this.userService.signupTeacher(this.teacherForm.value, this.teacherForm.value.cv,
        this.teacherForm.value.avatar).subscribe((response) => {
          console.log("Here response after signup", response.msg);
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
    } else if (this.path === "/subscriptionSt") {
      console.log("Here is the object", this.studentForm.value);
      this.studentForm.value.role = "student";
      console.log("Here is signupStudent obj", this.studentForm.value, "and student avatar", this.studentForm.value.avatar);
      this.userService.signupStudent(this.studentForm.value, this.studentForm.value.avatar).subscribe(
        (response) => {
          console.log("Here response after signup", response.msg);
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
    } else {
      console.log("Here is the object", this.parentForm.value);
      this.parentForm.value.role = "parent";
      this.userService.signupParent(this.parentForm.value).subscribe(
        (response) => {
          console.log("Here response after signup", response.msg);
          if (response.msg == "4") {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Sorry, but your child is not a registered student in our school',
            })
          } else if (response.msg == "3") {
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

}