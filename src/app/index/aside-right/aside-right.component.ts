import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { Utilisateur } from 'src/app/models/utilisateur.model';
import { UtilisateurService } from 'src/app/services/utilisateur.service';
import { CookieService} from 'ngx-cookie-service';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-aside-right',
  templateUrl: './aside-right.component.html',
  styleUrls: ['./aside-right.component.scss']
})
export class AsideRightComponent implements OnInit {
  userSup: Utilisateur = {
    nom: '',
    prenom: '',
    email: '',
    mdp: '',
    activeMail: false,
    activeAdmin: false
  };
  ///LOGIN
  emailg='';
  mdpg='';
  inscrit=false;
  title = 'formvalidation';
  submitted=false;
  login=false;
  loginForm!: FormGroup;
  signUpForm!: FormGroup;
  loginivalid = false;
  constructor(private cookieService: CookieService,private router: Router,private fb: FormBuilder,private sg: FormBuilder,private utilisateurService: UtilisateurService) {

   }
  ngOnInit(): void {
      this.checkCookie();
      this.loginForm = this.fb.group({
        email:  new FormControl('', [Validators.required,Validators.email]),
        mdp: ['',Validators.required]
      })
      this.signUpForm = this.sg.group({
        nom: ['',Validators.required],
        prenom: ['',Validators.required],
        emails:  new FormControl('', [Validators.required,Validators.email]),
        mdps: ['',Validators.required]
      })

     
  }
  checkCookie() {
    if(this.cookieService.get('token_id')!='') {
      //window.location.href="/compte/compte";
      this.router.navigate(['/compte/compte'])
    }
  }


  public onSubmit() {
    if(this.loginForm.valid) {
      //console.log(this.loginForm.value);
      //send the obj to database
      this.CheckLogin(this.emailg,this.mdpg);
    } else {
      //console.log("form is not valid");
    //throw error using toaster and with required fields
    this.validateAllFormFileds(this.loginForm);
    //alert("Your form is invalid")
    }

 }
 public onSingup(){
  if(this.signUpForm.valid) {
    console.log(this.signUpForm.value);
    //send the obj to database
    this.saveUser();
    } else {
      //console.log("form is not valid");
    //throw error using toaster and with required fields
    this.validateAllFormFileds(this.signUpForm);
    //alert("Your form is invalid")
    }

 }
 CheckLogin(email: string,mdp: string): void {
  this.utilisateurService.getEmailMdp(email,mdp)
    .subscribe({
      next: (data:any) => {
        //this.currentTutorial = data;
        console.log(data);
        //console.log(typeof data); //type of data
        console.log(Object.keys(data).length); //1 || 0
        var length = Object.keys(data).length
        
        if(length>0) { //autentifier
          this.cookieService.set('token_id',data[0].id,1,'/');
          //console.log(data[0].id);
          //console.log(data[0].activeAdmin);
          //console.log(data[0].activeMail);
          if(data[0].activeAdmin && data[0].activeMail) { //compte activer
            window.location.href="/compte/compte";

          } else { //attente d'activation
            window.location.href="/compte/confirmation";
          }
          
        } else { //addresse email ou mot de passe incorrect
          this.loginivalid=true;

        }
        
      },
      error: (e) =>{
        console.error(e);

      }
    });
}
 saveUser(): void {
  const data = {
    nom: this.userSup.nom,
    prenom: this.userSup.prenom,
    email: this.userSup.email,
    mdp: this.userSup.mdp,
    activeMail: this.userSup.activeMail,
    activeAdmin: this.userSup.activeAdmin,
  };
  console.log(data);
  this.utilisateurService.create(data)
    .subscribe({
      next: (res) => {
        console.log(res);
        console.log("success");
        this.inscrit = true;
      },
      error: (e) => console.error(e)
    });
}

 private validateAllFormFileds(formGroup:FormGroup) {
  Object.keys(formGroup.controls).forEach(field=>{
    const control = formGroup.get(field);
    if(control instanceof FormControl) {
      control.markAsDirty({onlySelf:true})
    }else if(control instanceof FormGroup){
      this.validateAllFormFileds(control)
    }
  })

 }
}
