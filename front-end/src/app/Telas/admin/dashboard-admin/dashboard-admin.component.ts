import { Component, OnInit } from '@angular/core';
import { LocalStorageUtils } from 'src/app/Validacao/localStorage';
import { DashboardVagas } from '../models/dashboard-vagas';
import { DadosAdmin, VagasAdmin } from '../models/vagasModel';
import { VagasAdminService } from '../services/vagasAdminService';

@Component({
  selector: 'app-dashboard-admin',
  templateUrl: './dashboard-admin.component.html',
  styleUrls: ['./dashboard-admin.component.css']
})
export class DashboardAdminComponent implements OnInit {

  public dadosAdmin: DadosAdmin;
  public dashboardVagas: DashboardVagas[];
  public vagasAdmin: VagasAdmin[];
  public localStorage: LocalStorageUtils = new LocalStorageUtils();
  
  constructor(private vagasAdminService : VagasAdminService) { }

  ngOnInit() {
    this.dadosAdmin = JSON.parse(JSON.stringify(this.localStorage.obterAdmin()));
    this.obterVagasUsuariosPorAdminId(this.dadosAdmin.id);    
  }

  public obterVagasUsuariosPorAdminId(adminId: string){
    this.vagasAdminService.obterVagasUsuariosPorAdminId(adminId)
      .subscribe(response => {
        if (response){
          this.dashboardVagas = response.data.dados;          
        }
      })
  }
}
