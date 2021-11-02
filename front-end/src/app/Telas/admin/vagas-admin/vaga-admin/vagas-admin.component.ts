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
  public vagaAdmin: VagasAdmin;

  @ViewChild('mdExcluir', { static: true })
  public mdExcluir: any;

  constructor(private router: Router, 
    private route: ActivatedRoute,
    private vagasAdminService: VagasAdminService
    ) { }

  ngOnInit() {
    this.dadosAdmin = JSON.parse(JSON.stringify(this.localStorage.obterAdmin()));
    this.obterPorIdAdmin(this.dadosAdmin.id);
  }

  cadastrarVaga(){
    this.router.navigate(['vagas-cadastro'], { relativeTo: this.route});
  }

  editarVaga(id: string){
    this.router.navigate(['vagas-editar', id], { relativeTo: this.route});
  }

  excluirVaga(id: string){    
    this.vagasAdminService.excluirVaga(id)
      .subscribe(response => {
        if (response){
          this.mdExcluir.hide();          
          document.location.reload();          
        }
        else{
          console.log("Falha ao excluir registro");
        }
      })
  }

  abrirExclusao(id: string): void{
    this.obterPorId(id);
    this.mdExcluir.show();
  }

  public obterPorId(id: string){
    this.vagasAdminService.obterPorId(id)
      .subscribe(response => {
        if (response.data.totalRegistros > 0){
          this.vagaAdmin = response.data.dados[0];          
        }
      })
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
