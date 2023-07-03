import { UserService } from 'src/app/services/user.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  word: string = "login";
  loginForm: FormGroup;
  errorMsg: string;

  constructor(private formBuilder: FormBuilder,
    private userService: UserService,
    private router:Router) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      tel: ["", [Validators.required, Validators.pattern("^[0-9]*$"),
      Validators.minLength(8), Validators.maxLength(8)]],
      pwd: ["", [Validators.required,
      Validators.pattern("^[a-zA-Z0-9!@#$%^&*]{6,12}$")]]
    });
  }

  login() {
    console.log("Here is the object", this.loginForm.value);
    this.userService.login(this.loginForm.value).subscribe(
      (response) => {
        if (response.msg == "3") {
          sessionStorage.setItem('jwt', response.user);
          // this.router.navigate([`profile/${this.loginForm.value.tel}`]);
        } else if (response.msg == "2") {
          Swal.fire('Sorry! but you should wait 24 hours to access your account. Thank you for your understanding!')
        } else {
          this.errorMsg = "Please Check Your Tel/Pwd";
        }
      }
    )
  }

}
