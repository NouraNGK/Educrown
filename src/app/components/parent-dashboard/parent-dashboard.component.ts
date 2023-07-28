import { Component, OnInit } from '@angular/core';
import { CourseService } from 'src/app/services/course.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';
import jwt_decode from 'jwt-decode';


@Component({
  selector: 'app-parent-dashboard',
  templateUrl: './parent-dashboard.component.html',
  styleUrls: ['./parent-dashboard.component.css']
})
export class ParentDashboardComponent implements OnInit {

  word: string;
  courses: any;
  teachers: any;
  decodedToken
  parentFirstName: string;

  constructor(private courseService: CourseService,
    private userService: UserService) { }

  ngOnInit() {
    this.decodedToken = this.decodeToken(sessionStorage.getItem("jwt"));
    this.parentFirstName = this.decodedToken.fName;
    this.word = `Welcome to your home page ${this.parentFirstName} 😊`;
    this.courseService.getAllCourses().subscribe((response) => {
      console.log("here is courses docs from BE", response.allCourses);
      this.courses = response.allCourses;
    });

    this.userService.getConfirmedTeachers().subscribe((response) => {
      if (response.docs.length == 0) {
        Swal.fire({
          icon: 'info',
          title: 'No teacher found',
          text: 'Sorry, no teachers were found in the database.',
          confirmButtonText: 'OK'
        });
      } else {
        this.teachers = response.docs;
        
      }
    });
  }

  
  showFullCVAlert(cvUrl: string) {
    Swal.fire({
      title: 'Teacher\'s CV',
      html: `<iframe src="${cvUrl}" width="800" height="600" frameborder="0"></iframe>`,
      confirmButtonText: 'Close',
      customClass: {
        popup: 'cv-swal-popup', // Classe personnalisée pour la fenêtre modale
        title: 'cv-swal-title', // Classe personnalisée pour le titre
        htmlContainer: 'cv-swal-html', // Classe personnalisée pour le conteneur du contenu
        confirmButton: 'cv-swal-confirm-button' // Classe personnalisée pour le bouton de confirmation
      },
      showCloseButton: true, // Afficher le bouton de fermeture
      focusConfirm: false, // Empêcher le focus sur le bouton de confirmation
      didOpen: () => {
        // Ajouter un ID au bouton de confirmation pour cibler le style facilement
        const confirmButton = Swal.getConfirmButton();
        if (confirmButton) {
          confirmButton.id = 'cv-swal-confirm-button';
        }
      }
    });
  }
  
  decodeToken(token: string) {
    return jwt_decode(token);
  }
  
}
