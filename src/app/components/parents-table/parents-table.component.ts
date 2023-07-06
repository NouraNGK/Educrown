import { UserService } from 'src/app/services/user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-parents-table',
  templateUrl: './parents-table.component.html',
  styleUrls: ['./parents-table.component.css']
})
export class ParentsTableComponent implements OnInit {

  parents: any;
  constructor(private userService: UserService) { }

  ngOnInit() {
    this.getAllParents();
  }

  deleteParent(id) {
    this.userService.deleteUser(id).subscribe(
      (response) => {
        if (response.msg == "1") {
          this.getAllParents();
        }
      });
  }

  getAllParents() {
    this.userService.getParents().subscribe(
      (response) => {
        this.parents = response.docs;
      });
  }


}
