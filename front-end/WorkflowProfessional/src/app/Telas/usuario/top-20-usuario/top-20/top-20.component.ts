import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { VagasUsuario } from '../../models/vagasUsuario';
import { VagasUsuarioService } from '../../services/vagasUsuarioService';

@Component({
  selector: 'app-top-20',
  templateUrl: './top-20.component.html',
  styleUrls: ['./top-20.component.css']
})
export class Top20Component implements OnInit {

  public vagasUsuario: VagasUsuario[];

  constructor(private router: Router, 
    private route: ActivatedRoute,
    private vagasUsuarioService : VagasUsuarioService
    ) { }

  ngOnInit() {
    this.obterVagasTop20();
  }

  visualizarVaga(id: string){
    this.router.navigate(['detalhes-vaga', id], { relativeTo: this.route});
  }

  public obterVagasTop20(){
    this.vagasUsuarioService.obterVagasTop20()
      .subscribe(response => {
        if (response){
          this.vagasUsuario = response.data.dados;                   
        }
      })
  }

}
