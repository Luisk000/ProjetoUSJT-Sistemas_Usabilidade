import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { VagasUsuario } from '../../models/vagasUsuario';
import { VagasUsuarioService } from '../../services/vagasUsuarioService';

@Component({
  selector: 'app-detalhes-vagas',
  templateUrl: './detalhes-vagas.component.html',
  styleUrls: ['./detalhes-vagas.component.css']
})
export class DetalhesVagasComponent implements OnInit {  
  
  public vagaUsuario: VagasUsuario;

  constructor(private _location: Location, 
    private route: ActivatedRoute,
    private vagasUsuarioService : VagasUsuarioService
    ) { }

  ngOnInit() {    
    this.obterPorId(this.route.snapshot.params['id']); 
  }

  voltarVagasUsuario(){
    this._location.back();
  }

  public obterPorId(id: string){
    this.vagasUsuarioService.obterPorId(id)
      .subscribe(response => {
        if (response){
          this.vagaUsuario = response.data.dados;
          console.log(this.vagaUsuario)          
        }
      })
  }

}
