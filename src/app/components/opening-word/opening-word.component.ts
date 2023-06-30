import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-opening-word',
  templateUrl: './opening-word.component.html',
  styleUrls: ['./opening-word.component.css']
})
export class OpeningWordComponent implements OnInit {

  @Input() openingWordInput: string;
  constructor() { }

  ngOnInit() {
  }

}
