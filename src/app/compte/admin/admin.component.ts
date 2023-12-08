import { Component, OnInit } from '@angular/core';
import { Utilisateur } from 'src/app/models/utilisateur.model';
import { UtilisateurService } from 'src/app/services/utilisateur.service';
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  utilisateurs?: Utilisateur[];
  currentUtilisateur: Utilisateur = {};
  currentIndex = -1;
  nom = '';
  message='';

  constructor(private utilisateurService: UtilisateurService) { }

  ngOnInit(): void {
    this.retrieveUtilisateur();
  }
  retrieveUtilisateur(): void {
    this.utilisateurService.getAll()
      .subscribe({
        next: (data) => {
          this.utilisateurs = data;
          console.log(this.utilisateurs);
        },
        error: (e) => console.error(e)
      });
  }
  refreshList(): void {
    this.retrieveUtilisateur();
    this.currentUtilisateur = {};
    this.currentIndex = -1;
  }
  setActiveUtilisateur(utilisateur: Utilisateur, index: number): void {
    this.currentUtilisateur = utilisateur;
    this.currentIndex = index;
    console.log(this.currentIndex);
    this.currentUtilisateur.activeAdmin=true;
    this.currentUtilisateur.activeMail=true;
    console.log(this.currentUtilisateur);
    this.updateTutorial();
  }
  setDesactiveUtilisateur(utilisateur: Utilisateur, index: number): void {
    this.currentUtilisateur = utilisateur;
    this.currentIndex = index;
    console.log(this.currentIndex);
    this.currentUtilisateur.activeAdmin=false;
    this.currentUtilisateur.activeMail=true;
    console.log(this.currentUtilisateur);
    this.updateTutorial();
  }
  updateTutorial(): void {
    this.message = '';
    this.utilisateurService.update(this.currentUtilisateur.id, this.currentUtilisateur)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.message = res.message ? res.message : 'This tutorial was updated successfully!';
          this.refreshList();
        },
        error: (e) => console.error(e)
      });
  }
  searchName(): void {
    this.currentUtilisateur = {};
    this.currentIndex = -1;
    this.utilisateurService.findByTitle(this.nom)
      .subscribe({
        next: (data) => {
          this.utilisateurs = data;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }
}
