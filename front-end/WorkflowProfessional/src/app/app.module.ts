import { HttpClient, HttpClientModule } from '@angular/common/http';
import { LOCALE_ID, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './Telas/login-inicio/home/home.component';
import { NotFoundComponent } from './Telas/login-inicio/not-found/not-found.component';
import { LoginComponent } from './Telas/login-inicio/login/login.component';
import { RegistroComponent } from './Telas/login-inicio/registro/registro.component';
import { NgBrazil } from 'ng-brazil';
import { TextMaskModule } from 'angular2-text-mask';
import { CustomFormsModule } from 'ng2-validation';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CurrencyMaskModule } from 'ng2-currency-mask';
import { AngularDraggableModule } from 'angular2-draggable';
import { ModalModule } from 'ngx-bootstrap/modal';
import { UsuarioService } from './Services/usuario-service';
import { registerLocaleData } from '@angular/common';
import localePT from '@angular/common/locales/pt';
registerLocaleData(localePT);


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NotFoundComponent,
    LoginComponent,
    RegistroComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    RouterModule,
    NgbModule,
    FormsModule,
    HttpClientModule,    
    ReactiveFormsModule,
    NgBrazil,
    TextMaskModule,
    CustomFormsModule,
    CurrencyMaskModule,
    AngularDraggableModule,
    BrowserAnimationsModule,
    ModalModule.forRoot()
  ],
  exports: [
    NotFoundComponent
  ],
  providers: [HttpClient, UsuarioService, {provide: LOCALE_ID, useValue: 'pt-br'}],
  bootstrap: [AppComponent]
})
export class AppModule { }
