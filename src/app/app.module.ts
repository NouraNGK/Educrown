import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './components/home/home.component';
import { FooterComponent } from './components/footer/footer.component';
import { SignupComponent } from './components/signup/signup.component';
import { LoginComponent } from './components/login/login.component';
import { BannerComponent } from './components/banner/banner.component';
import { AboutComponent } from './components/about/about.component';
import { CoursesComponent } from './components/courses/courses.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { TestimonialsComponent } from './components/testimonials/testimonials.component';
import { TeachersComponent } from './components/teachers/teachers.component';
import { BlogComponent } from './components/blog/blog.component';
import { NewslettersComponent } from './components/newsletters/newsletters.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from "@angular/common/http";
import { OpeningWordComponent } from './components/opening-word/opening-word.component';
import { SignupAdminComponent } from './components/signup-admin/signup-admin.component';
import { AddCourseComponent } from './components/add-course/add-course.component';
import { SearchTeachersComponent } from './components/search-teachers/search-teachers.component';
import { CourseComponent } from './components/course/course.component';
import { AdminComponent } from './components/admin/admin.component';
import { TeachersTableComponent } from './components/teachers-table/teachers-table.component';
import { StudentsTableComponent } from './components/students-table/students-table.component';
import { ParentsTableComponent } from './components/parents-table/parents-table.component';
import { CoursesTableComponent } from './components/courses-table/courses-table.component';
import { AssignmentComponent } from './components/assignment/assignment.component';
import { AssignmentDetailsComponent } from './components/assignment-details/assignment-details.component';
import { TeacherCoursesComponent } from './components/teacher-courses/teacher-courses.component';
import { CourseInfoComponent } from './components/course-info/course-info.component';
import { StudentEvaluationComponent } from './components/student-evaluation/student-evaluation.component';
import { StudentCoursesComponent } from './components/student-courses/student-courses.component';
import { StudentCourseInfoComponent } from './components/student-course-info/student-course-info.component';
import { UserInfoComponent } from './components/user-info/user-info.component';
import { ParentDashboardComponent } from './components/parent-dashboard/parent-dashboard.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    FooterComponent,
    SignupComponent,
    LoginComponent,
    BannerComponent,
    AboutComponent,
    CoursesComponent,
    CategoriesComponent,
    TestimonialsComponent,
    TeachersComponent,
    BlogComponent,
    NewslettersComponent,
    OpeningWordComponent,
    SignupAdminComponent,
    AddCourseComponent,
    SearchTeachersComponent,
    CourseComponent,
    AdminComponent,
    TeachersTableComponent,
    StudentsTableComponent,
    ParentsTableComponent,
    CoursesTableComponent,
    AssignmentComponent,
    AssignmentDetailsComponent,
    TeacherCoursesComponent,
    CourseInfoComponent,
    StudentEvaluationComponent,
    StudentCoursesComponent,
    StudentCourseInfoComponent,
    UserInfoComponent,
    ParentDashboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
