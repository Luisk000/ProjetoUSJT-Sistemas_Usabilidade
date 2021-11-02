import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { DadosUsuario, VagasUsuario } from '../../models/vagasUsuario';
import { VagasUsuarioService } from '../../services/vagasUsuarioService';
import { LocalStorageUtils } from 'src/app/Validacao/localStorage';

@Component({
  selector: 'app-detalhes-vagas',
  templateUrl: './detalhes-vagas.component.html',
  styleUrls: ['./detalhes-vagas.component.css']
})
export class DetalhesVagasComponent implements OnInit {  
  
  public dadosUsuario: DadosUsuario;
  public vagaUsuario: VagasUsuario;
  public localStorage: LocalStorageUtils = new LocalStorageUtils();
  public candidatura: boolean = false;
  public idVaga: string = "";

  constructor(private _location: Location, 
    private route: ActivatedRoute,
    private vagasUsuarioService : VagasUsuarioService
    ) { }

  ngOnInit() {
    this.idVaga = this.route.snapshot.params['id'];
    this.dadosUsuario = JSON.parse(JSON.stringify(this.localStorage.obterUsuario()));
    this.obterPorId(this.idVaga);
    this.checarCandidatura(this.idVaga); 
  }

  voltarVagasUsuario(){
    this._location.back();
  }

  public obterPorId(id: string){
    this.vagasUsuarioService.obterPorId(id)
      .subscribe(response => {
        if (response){
          this.vagaUsuario = response.data.dados;
        }
      })
  }

  public checarCandidatura(idVaga: string){        
    this.vagasUsuarioService.obterCandidatoInscrito(idVaga, this.dadosUsuario.id)
      .subscribe(response => {        
        if (response == true || response == false){
          this.candidatura = response;        
        }
      })  
  }

  public candidatar(){    
    this.vagasUsuarioService.candidatarVaga(this.idVaga, this.dadosUsuario.id)
      .subscribe(response => {
        if (response){
          this.candidatura = true;
        }
      });
  }

}
