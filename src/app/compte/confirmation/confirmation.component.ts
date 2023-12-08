import { Component, OnInit } from '@angular/core';
import { CookieService} from 'ngx-cookie-service';
import { ActivatedRoute, Router } from '@angular/router';
import { Utilisateur } from 'src/app/models/utilisateur.model';
import { UtilisateurService } from 'src/app/services/utilisateur.service';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.scss']
})
export class ConfirmationComponent implements OnInit {
  acriveMail=true;
  acriveAdmin=true;
  nom='';
  prenom='';
  constructor(private cookieService: CookieService,private router: Router,private utilisateurService: UtilisateurService) { }

  ngOnInit(): void {
    this.checkCookie();
    //this.getTutorial('6');
  }
  checkCookie() {
    if(this.cookieService.get('token_id')=='') {
      //window.location.href="/compte/compte";
      this.router.navigate(['/'])
    } else {
      var id = this.cookieService.get('token_id');
      this.getUtilisateur(id);
    }
  }
  getUtilisateur(id: string): void {
    this.utilisateurService.get(id)
      .subscribe({
        next: (data:any) => {
          //this.currentTutorial = data;
          console.log(data);
          this.acriveMail=data.activeMail;
          this.acriveAdmin=data.activeAdmin;
          this.nom = data.nom;
          this.prenom = data.prenom;
          console.log(data.activeMail);
          if(this.acriveMail==true && this.acriveAdmin==true) { //compte acriver
            window.location.href="/compte/compte";
          }
        },
        error: (e) => console.error(e)
      });
  }
  logout() {
    this.cookieService.delete('token_id','/');
    window.location.href="/";
  }
}
