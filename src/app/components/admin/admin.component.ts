import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import jwt_decode from 'jwt-decode';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  word: string = "Welcome";
  connectedUser: any;
  constructor(private userService : UserService,
    private router: Router) { }

  ngOnInit() {
    let decodedToken: any = this.decodeToken(sessionStorage.getItem("jwt"));
    this.userService.getUserById(decodedToken.userId).subscribe(
      (response) => {
        console.log("Here is the object from BE", response.user);
        this.connectedUser = response.user;
      }
    )
  }

  decodeToken(token: string) {
    return jwt_decode(token);
  }

  logOut() {
    sessionStorage.removeItem("jwt");
    this.router.navigate([""]);
  }

}
