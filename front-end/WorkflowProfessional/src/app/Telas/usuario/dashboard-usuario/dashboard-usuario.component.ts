import { Component, OnInit } from '@angular/core';
import { LocalStorageUtils } from 'src/app/Validacao/localStorage';
import { DadosUsuario, VagasUsuario } from '../models/vagasUsuario';
import { VagasUsuarioService } from '../services/vagasUsuarioService';

@Component({
  selector: 'app-dashboard-usuario',
  templateUrl: './dashboard-usuario.component.html',
  styleUrls: ['./dashboard-usuario.component.css']
})
export class DashboardUsuarioComponent implements OnInit {

  public dadosUsuario: DadosUsuario;
  public vagasUsuario: VagasUsuario[];
  public localStorage: LocalStorageUtils = new LocalStorageUtils();

  constructor(private vagasUsuarioService : VagasUsuarioService) { }

  ngOnInit() {
    this.dadosUsuario = JSON.parse(this.localStorage.obterUsuario());    
    this.obterPorUsuarioId(this.dadosUsuario[0].id);
  }

  public obterPorUsuarioId(id: string){
    this.vagasUsuarioService.obterPorUsuarioId(id)
      .subscribe(response => {
        if (response){
          this.vagasUsuario = response.data.dados;          
        }
      })
  }

}
