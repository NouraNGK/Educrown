import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { SignupComponent } from './components/signup/signup.component';
import { LoginComponent } from './components/login/login.component';
import { SignupAdminComponent } from './components/signup-admin/signup-admin.component';
import { AddCourseComponent } from './components/add-course/add-course.component';
import { SearchTeachersComponent } from './components/search-teachers/search-teachers.component';
import { CoursesComponent } from './components/courses/courses.component';
import { AdminComponent } from './components/admin/admin.component';
import { AssignmentComponent } from './components/assignment/assignment.component';
import { AssignmentDetailsComponent } from './components/assignment-details/assignment-details.component';
import { TeacherCoursesComponent } from './components/teacher-courses/teacher-courses.component';
import { CourseInfoComponent } from './components/course-info/course-info.component';
import { StudentEvaluationComponent } from './components/student-evaluation/student-evaluation.component';
import { StudentCoursesComponent } from './components/student-courses/student-courses.component';

const routes: Routes = [
 // http://localhost:4200/
 {path: "", component: HomeComponent},
 // http://localhost:4200/subscriptionTe
 {path: "subscriptionTe", component: SignupComponent},
 // http://localhost:4200/subscriptionSt
 {path: "subscriptionSt", component: SignupComponent},
 // http://localhost:4200/subscriptionPa
 {path: "subscriptionPa", component: SignupComponent},
 // http://localhost:4200/signupAdmin
 {path: "signupAdmin", component: SignupAdminComponent},
 // http://localhost:4200/signin
 {path:"signin", component: LoginComponent},
 // http://localhost:4200/addCourse
 {path:"addCourse", component: AddCourseComponent},
 // http://localhost:4200/searchTeachers
 {path:"searchTeachers", component: SearchTeachersComponent},
 // http://localhost:4200/allCourses
 {path: "allCourses", component: CoursesComponent},
 // http://localhost:4200/admin
 {path:"admin", component: AdminComponent},
 // http://localhost:4200/assignment
 {path:"assignment", component: AssignmentComponent},
 // http://localhost:4200/assignment/:id
 {path:"assignmentDetails/:id", component: AssignmentDetailsComponent},
 // http://localhost:4200/myCourses
 {path: "myCourses", component: TeacherCoursesComponent},
 // http://localhost:4200/courseInfo/:id
 {path: "courseInfo/:id", component: CourseInfoComponent},
  // http://localhost:4200/studentEvaluation/:x/:y
  {path: "studentEvaluation/:x/:y", component: StudentEvaluationComponent},
  // http://localhost:4200/studentCourses
  {path: "studentCourses", component: StudentCoursesComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
