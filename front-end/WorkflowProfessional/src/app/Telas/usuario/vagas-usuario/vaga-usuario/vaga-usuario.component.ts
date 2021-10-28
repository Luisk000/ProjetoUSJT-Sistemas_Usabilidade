import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { VagasUsuario } from '../../models/vagasUsuario';
import { VagasUsuarioService } from '../../services/vagasUsuarioService';

@Component({
  selector: 'app-vaga-usuario',
  templateUrl: './vaga-usuario.component.html',
  styleUrls: ['./vaga-usuario.component.css']
})
export class VagaUsuarioComponent implements OnInit {

  public vagasUsuario: VagasUsuario[];
  public vagaUsuario: VagasUsuario;
  errorMessage: string;
  public filtroNome: string;
  public filtroDescricao: string;

  constructor(private router: Router, 
    private route: ActivatedRoute,
    private vagasUsuarioService : VagasUsuarioService
    ) { }

  ngOnInit() {
    this.obterVagas();
  }

  visualizarVaga(id: string){
    this.router.navigate(['detalhes-vaga', id], { relativeTo: this.route })
  }

  public obterVagas(){
    this.vagasUsuarioService.obterTodas()
      .subscribe(response => {
        if (response){
          this.vagasUsuario = response.data.dados;          
        }
      })
  }

  public obterVagasPorNome(filtro: string){
    this.filtroDescricao = '';
    this.vagasUsuarioService.obterVagasPorNome(filtro)
      .subscribe(response => {
        if (response){
          this.vagasUsuario = response.data.dados;               
        }
      })
  }

  public obterVagasPorDescricao(filtro: string){
    this.filtroNome = '';
    this.vagasUsuarioService.obterVagasPorDescricao(filtro)
      .subscribe(response => {
        if (response){
          this.vagasUsuario = response.data.dados;               
        }
      })
  }
}
