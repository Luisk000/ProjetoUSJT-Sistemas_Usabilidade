import { AfterViewInit, Component, ElementRef, OnInit, ViewChildren } from '@angular/core';
import { FormBuilder, FormControlName, FormGroup, Validators } from '@angular/forms';
import { DisplayMessage, GenericValidator, ValidationMessages } from 'src/app/Validacao/generic-form-validator';
import { fromEvent, merge, Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { VagaAdmin } from '../../model-admin/vaga-admin';
import { LocalStorageUtils } from 'src/app/Validacao/localStorage';
import { DadosAdmin, VagasAdmin } from '../../models/vagasModel';
import { VagasAdminService } from '../../services/vagasAdminService';

@Component({
  selector: 'app-cadastrar-vaga-admin',
  templateUrl: './cadastrar-vaga-admin.component.html',
  styleUrls: ['./cadastrar-vaga-admin.component.css']
})
export class CadastrarVagaAdminComponent implements OnInit, AfterViewInit {

  public localStorage: LocalStorageUtils = new LocalStorageUtils();
  public dadosAdmin: DadosAdmin;
  public vagasAdmin: VagasAdmin;
  public vagaAdmin: VagasAdmin;
  public idVaga: string = "";
  public novoCadastro: boolean = true;

  @ViewChildren(FormControlName, {read: ElementRef}) forInputElements: ElementRef[];

  cadastroVagaForm: FormGroup; 
  
  validationMessages: ValidationMessages;
  genericValidator: GenericValidator;
  displayMessage: DisplayMessage = {};

  constructor(private fb: FormBuilder, 
    private router: Router,
    private route: ActivatedRoute,
    private vagasAdminService: VagasAdminService
    ) {
      
    this.validationMessages = {
      funcao: {
        required: 'A função é requerida',
        minlength: 'A função precisa ter no mínimo 2 caracteres',
        maxlength: 'A função precisa ter no máximo 150 caracteres'
      },
      descricao: {
        required: 'A descrição é requerida',
        minlength: 'A descrição precisa ter no mínimo 2 caracteres',
        maxlength: 'A descrição precisa ter no máximo 150 caracteres'
      },
      area: {
        required: 'A area é requerida',
        minlength: 'A area precisa ter no mínimo 2 caracteres',
        maxlength: 'A area precisa ter no máximo 150 caracteres'
      },
      horario: {
        required: 'O horário é requerido',
        minlength: 'O horário precisa ter no mínimo 8 caracteres',
        maxlength: 'O horário precisa ter no máximo 150 caracteres'
      },
      salario: {
        required: 'O salário é requerido',
        moeda: 'Valor inválido',
        min: 'O valor deve ser no mínimo R$ 1.000,00',
        max: 'O valor deve ser no máximo R$ 20.000,00'
      },      
      beneficios: {
        required: 'O benefício é requerido',
        minlength: 'O benefício precisa ter no mínimo 10 caracteres',
        maxlength: 'O benefício precisa ter no máximo 300 caracteres'
      },
      quantidade: {
        required: 'A quantidade é requerida',
        moeda: 'Quantidade inválida',
        min: 'A Quantidade deve ser no mínimo 1',
        max: 'A Quantidade deve ser no máximo 20'
      }
    };
    this.genericValidator = new GenericValidator(this.validationMessages);
  }

  ngOnInit() {
    this.idVaga = this.route.snapshot.params['id'];
    this.dadosAdmin = JSON.parse(this.localStorage.obterAdmin());
    if (this.idVaga){          
      this.obterPorId(this.idVaga);
      this.novoCadastro = false;
    }

    this.cadastroVagaForm = this.fb.group({
      funcao: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(150)]],
      descricao: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(150)]],
      area: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(150)]],
      horario: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(150)]],
      salario: ['', [Validators.required, Validators.min(1000), Validators.max(20000)]],
      beneficios: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(300)]],
      quantidade: ['', [Validators.required, Validators.min(1), Validators.max(20)]]     
    });
  }

  ngAfterViewInit(): void {
    let controlBlurs: Observable<any>[] = this.forInputElements
    .map((formControl: ElementRef) => fromEvent(formControl.nativeElement, 'blur'));

    merge(...controlBlurs).subscribe(() => {
      this.displayMessage = this.genericValidator.processarMensagens(this.cadastroVagaForm);
    });
  }

  salvarVaga(){

    if(this.cadastroVagaForm.dirty && this.cadastroVagaForm.valid){
      this.vagaAdmin = Object.assign({}, this.vagaAdmin, this.cadastroVagaForm.value);
      if (this.novoCadastro){
        this.vagaAdmin.adminId = this.dadosAdmin.id; 
        this.cadastrarVaga(this.vagaAdmin); 
      }
      else{ this.atualizarVaga(this.vagaAdmin); }      
    }    
  }

  voltarDashboard(){
    this.router.navigate(['admin/vagas']);
  }

  preencherForm(vaga: VagasAdmin) {
    this.cadastroVagaForm.patchValue({      
      funcao: vaga.funcao,
      descricao: vaga.descricao,
      area: vaga.area,
      horario: vaga.horario,
      salario: vaga.salario,
      beneficios: vaga.beneficios,
      quantidade: vaga.quantidade
    });
  }

  public obterPorId(id: string){
    this.vagasAdminService.obterPorId(id)
      .subscribe(response => {
        if (response){
          this.vagaAdmin = response.data.dados[0];
          if (JSON.stringify(this.vagaAdmin) !== '[]'){            
            this.preencherForm(this.vagaAdmin);                        
          }
        }
      })
  }

  public atualizarVaga(vaga: VagasAdmin){
    this.vagasAdminService.atualizarVaga(vaga)
      .subscribe(response => {
        if (response){          
          document.location.reload();
        }else{
          console.log("Erro ao atualizar vaga")
        }
      })
  }

  public cadastrarVaga(vaga: VagasAdmin){
    this.vagasAdminService.cadastrarVaga(vaga)
      .subscribe(response => {
        if (response){                    
          this.voltarDashboard();
          document.location.reload();
        }else{
          console.log("Erro ao atualizar vaga")
        }
      })
  }

}
