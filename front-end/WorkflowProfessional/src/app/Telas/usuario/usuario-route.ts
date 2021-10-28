import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { UsuarioComponent } from './usuario.component';
import { DashboardUsuarioComponent } from './dashboard-usuario/dashboard-usuario.component';
import { AreasMaisComponent } from './areas-mais/areas-mais.component';
import { CadastroUsuarioComponent } from './cadastro-usuario/cadastro-usuario.component';
import { DetalhesVagasComponent } from './vagas-usuario/detalhes-vagas/detalhes-vagas.component';
import { Top20Component } from './top-20-usuario/top-20/top-20.component';
import { VagaUsuarioComponent } from './vagas-usuario/vaga-usuario/vaga-usuario.component';
import { VagaComponent } from './vagas-usuario/vaga.component';
import { Top20UsuarioComponent } from './top-20-usuario/top20-usuario.component';

const usuarioRouterConfig: Routes = [
  {
    path: '', component: UsuarioComponent,
    children: [

      { path: '', component: DashboardUsuarioComponent },

      { path: 'home', component: DashboardUsuarioComponent },

      { path: 'areas-mais', component: AreasMaisComponent },

      { path: 'cadastro-usuario', component: CadastroUsuarioComponent },      

      { path: 'top-20', component: Top20UsuarioComponent,
        children: [
          { path: '', component: Top20Component },

          { path: 'detalhes-vaga/:id', component: DetalhesVagasComponent },
        ]
      },       

      { path: 'vagas-usuario', component: VagaComponent,
        children: [
          { path: '', component: VagaUsuarioComponent },

          { path: 'detalhes-vaga/:id', component: DetalhesVagasComponent },
        ]
      }    
    ]

  }
  
]

@NgModule({
  imports: [
    RouterModule.forChild(usuarioRouterConfig)
  ],
  exports: [RouterModule]
})
export class UsuarioRoutingModule { }