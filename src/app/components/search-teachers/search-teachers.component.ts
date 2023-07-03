import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-search-teachers',
  templateUrl: './search-teachers.component.html',
  styleUrls: ['./search-teachers.component.css']
})
export class SearchTeachersComponent implements OnInit {

  word: string = "search teachers";
  searchForm: FormGroup;
  teacher:any={};
  constructor() { }

  ngOnInit() {
  }

  searchTeachers(){
    console.log("Here is the object", this.teacher);
  }
}
