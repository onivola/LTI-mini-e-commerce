import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Utilisateur } from '../models/utilisateur.model';
const baseUrl = 'http://localhost:8080/api/Utilisateur';
@Injectable({
  providedIn: 'root'
})
export class UtilisateurService {

  constructor(private http: HttpClient) { }
  getAll(): Observable<Utilisateur[]> {
    return this.http.get<Utilisateur[]>(baseUrl);
  }
  get(id: any): Observable<Utilisateur> {
    return this.http.get<Utilisateur>(`${baseUrl}/${id}`);
  }
  getEmailMdp(email: any,mdp: any): Observable<Utilisateur> {
    return this.http.get<Utilisateur>(`${baseUrl}/${email}/${mdp}`);
  }
  create(data: any): Observable<any> {
    return this.http.post(baseUrl, data);
  }
  update(id: any, data: any): Observable<any> {
    return this.http.put(`${baseUrl}/${id}`, data);
  }
  delete(id: any): Observable<any> {
    return this.http.delete(`${baseUrl}/${id}`);
  }
  deleteAll(): Observable<any> {
    return this.http.delete(baseUrl);
  }
  findByTitle(nom: any): Observable<Utilisateur[]> {
    return this.http.get<Utilisateur[]>(`${baseUrl}?nom=${nom}`);
  }
}
