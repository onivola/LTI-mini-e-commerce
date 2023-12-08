import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component'
import { SectionComponent } from './index/section/section.component';
import { HeaderComponent } from './index/header/header.component';
import { AsideLeftComponent } from './index/aside-left/aside-left.component';
import { AsideRightComponent } from './index/aside-right/aside-right.component';
import { FooterComponent } from './index/footer/footer.component';
import { IndexComponent } from './index/index/index.component';
import {Routes,RouterModule} from "@angular/router";
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { CompteComponent } from './compte/compte/compte.component';
import { ConfirmationComponent } from './compte/confirmation/confirmation.component';
import { AdminComponent } from './compte/admin/admin.component';
import { PaiementComponent } from './compte/compte/paiement/paiement.component';

import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ToastrModule } from 'ngx-toastr';

const appRoutes: Routes = [
  { path: '',component: IndexComponent },
  { path: 'compte/compte',component: CompteComponent },
  { path: 'compte/confirmation',component: ConfirmationComponent },
  { path: 'compte/super_compteAdmin',component: AdminComponent },
  { path: '**', redirectTo: '' }
];


@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
    SectionComponent,
    HeaderComponent,
    AsideLeftComponent,
    AsideRightComponent,
    FooterComponent,
    CompteComponent,
    ConfirmationComponent,
    AdminComponent,
    PaiementComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(appRoutes),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    CommonModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot(), // ToastrModule added
  ],
  providers: [
    CookieService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
