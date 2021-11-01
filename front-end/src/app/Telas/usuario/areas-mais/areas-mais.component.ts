import { Component, OnInit } from '@angular/core';
import { VagasUsuario } from '../models/vagasUsuario';
import { VagasUsuarioService } from '../services/vagasUsuarioService';

@Component({
  selector: 'app-areas-mais',
  templateUrl: './areas-mais.component.html',
  styleUrls: ['./areas-mais.component.css']
})
export class AreasMaisComponent implements OnInit {

  public vagasUsuario: VagasUsuario[];

  constructor(private vagasUsuarioService : VagasUsuarioService) { }

  ngOnInit() {
    this.obterAreasMais();
  }

  public obterAreasMais(){
    this.vagasUsuarioService.obterAreasMais()
      .subscribe(response => {
        if (response){
          this.vagasUsuario = response.data.dados;
        }
      })
  }

}
