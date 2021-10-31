import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LocalStorageUtils } from 'src/app/Validacao/localStorage';
import { DadosAdmin, VagasAdmin } from '../../models/vagasModel';
import { VagasAdminService } from '../../services/vagasAdminService';

@Component({
  selector: 'app-vagas-admin',
  templateUrl: './vagas-admin.component.html',
  styleUrls: ['./vagas-admin.component.css']
})
export class VagasAdminComponent implements OnInit {

  public localStorage: LocalStorageUtils = new LocalStorageUtils();
  public dadosAdmin: DadosAdmin;
  public vagasAdmin: VagasAdmin[];

  @ViewChild('mdExcluir', { static: true })
  public mdExcluir: any;

  constructor(private router: Router, 
    private route: ActivatedRoute,
    private vagasAdminService: VagasAdminService
    ) { }

  ngOnInit() {
    this.dadosAdmin = JSON.parse(this.localStorage.obterAdmin());
    this.obterPorIdAdmin(this.dadosAdmin.id);
  }

  cadastrarVaga(){
    this.router.navigate(['vagas-cadastro'], { relativeTo: this.route});
  }

  editarVaga(id: string){
    this.router.navigate(['vagas-editar', id], { relativeTo: this.route});
  }

  excluirVaga(){}

  abrirExclusao(): void{
    this.mdExcluir.show();
  }

  public obterPorIdAdmin(adminId: string){
    this.vagasAdminService.obterPorIdAdmin(adminId)
      .subscribe(response => {
        if (response){
          this.vagasAdmin = response.data.dados
        }
      })
  }

}
