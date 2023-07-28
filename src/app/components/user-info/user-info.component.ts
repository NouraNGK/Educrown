import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css']
})
export class UserInfoComponent implements OnInit {

  @Input()
  userInput: any;

  constructor() { }

  ngOnInit() {
  }

  backgroundColor() {
    if (this.userInput && this.userInput.specialty) {
      switch (this.userInput.specialty) {
        case 'business':
          return '#ffd3d3';
        case 'data science':
          return '#f5f0ff';
        case 'development':
          return '#FFF3D3';
        case 'finance':
          return '#FFF0F9';
        case 'marketing':
          return '#F7EEFA';
        default:
          return '#E8F9EF';
      }
    }
    return '#E8F9EF'; // Couleur de fond par défaut
  }

}
