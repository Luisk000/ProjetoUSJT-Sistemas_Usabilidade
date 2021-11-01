import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { DashboardAdminComponent } from './dashboard-admin/dashboard-admin.component';
import { CadastroAdminComponent } from './cadastro-admin/cadastro-admin.component';
import { AdminComponent } from './admin.component';
import { VagasAdminComponent } from './vagas-admin/vaga-admin/vagas-admin.component';
import { VagasComponent } from './vagas-admin/vagas.component';
import { CadastrarVagaAdminComponent } from './vagas-admin/cadastrar-vaga-admin/cadastrar-vaga-admin.component';

const adminRouterConfig: Routes = [
  {
    path: '', component: AdminComponent,
    children: [

      { path: '', component: DashboardAdminComponent },

      { path: 'home', component: DashboardAdminComponent },

      { path: 'cadastro', component: CadastroAdminComponent },

      { path: 'vagas', component: VagasComponent,
        children: [
          { path: '', component: VagasAdminComponent },

          { path: 'vagas-cadastro', component: CadastrarVagaAdminComponent },

          { path: 'vagas-editar/:id', component: CadastrarVagaAdminComponent }
        ]
      }

    ]
  }
]

@NgModule({
  imports: [
    RouterModule.forChild(adminRouterConfig)
  ],
  exports: [RouterModule]
})
export class AdminRoutingModule { }