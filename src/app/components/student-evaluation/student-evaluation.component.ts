import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-student-evaluation',
  templateUrl: './student-evaluation.component.html',
  styleUrls: ['./student-evaluation.component.css']
})
export class StudentEvaluationComponent implements OnInit {

  word: string = "evaluation";
  evaluationForm: FormGroup;
  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.evaluationForm = this.fb.group({
      note: ["", [Validators.required, Validators.min(0), Validators.max(20)]],
      comment: ["", [Validators.required, Validators.maxLength(45)]]
    });
  }

  addEvaluation() {
    
  }
}
