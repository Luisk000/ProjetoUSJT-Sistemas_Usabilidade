import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './Telas/login-inicio/home/home.component';
import { LoginComponent } from './Telas/login-inicio/login/login.component';
import { NotFoundComponent } from './Telas/login-inicio/not-found/not-found.component';
import { RegistroComponent } from './Telas/login-inicio/registro/registro.component';

const routes: Routes = [

  { path: '', component: HomeComponent},

  { path: 'registro/:id', component: RegistroComponent},

  { path: 'login/:id', component: LoginComponent},
  
  { path: 'admin', loadChildren: () => import('./Telas/admin/admin-module').then(m => m.AdminModule) },

  { path: 'usuario', loadChildren: () => import('./Telas/usuario/usuario-module').then(m => m.UsuarioModule) },

  { path: '**', component: NotFoundComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
