import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { SignupComponent } from './components/signup/signup.component';
import { LoginComponent } from './components/login/login.component';


const routes: Routes = [
 // http://localhost:4200/
 {path: "", component: HomeComponent},
 // http://localhost:4200/subscription
 {path: "subscription", component: SignupComponent},
 // http://localhost:4200/signin
 {path:"signin", component: LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
